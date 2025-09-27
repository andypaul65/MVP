import { useState, useEffect, useRef } from 'react';
import { apiService } from '@/services/apiService'; // Adjusted import to match object export
import type { MessageDto } from '@/types/MessageDto'; // Assume existing DTO type
import SockJS from 'sockjs-client';
import * as StompJs from 'stompjs';

// Interface for the hook's return value
export interface SystemState {
  state: string | null;
  messages: MessageDto[]; // Current state as message array
  error: string | null;
  loading: boolean;
  sendMessage: (payload: MessageDto) => Promise<void>;
  isConnected: boolean; // WebSocket connection status
}

// Custom hook for namespace-specific state and message tracking with WebSocket support
export const useSystemState = (namespace: string): SystemState => {
  const [state, setState] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const stompClientRef = useRef<any>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const dto = await apiService.getState(namespace);
      setState(dto.content);
      setMessages([dto]); // Current state as the latest message
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const connectWebSocket = () => {
    if (stompClientRef.current?.connected) return;

    try {
      const socket = new SockJS('http://localhost:8080/ws');
      const stompClient = StompJs.over(socket);

      // Disable debug logging in production
      if (import.meta.env.PROD) {
        stompClient.debug = () => {};
      }

      stompClient.connect({}, () => {
        setIsConnected(true);
        setError(null);

        // Subscribe to namespace-specific state updates
        stompClient.subscribe(`/topic/state/${namespace}`, (message: any) => {
          try {
            const dto: MessageDto = JSON.parse(message.body);
            setState(dto.content);
            setMessages(prev => [...prev.slice(-9), dto]); // Keep last 10 messages
          } catch (err) {
            console.error('Error parsing WebSocket message:', err);
          }
        });
      }, (error: any) => {
        console.error('WebSocket connection error:', error);
        setIsConnected(false);
        setError('WebSocket connection failed');

        // Attempt to reconnect after 5 seconds
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
      });

      stompClientRef.current = stompClient;
    } catch (err) {
      console.error('WebSocket setup error:', err);
      setError('WebSocket setup failed');
    }
  };

  const disconnectWebSocket = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.disconnect();
    }
    stompClientRef.current = null;
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    setIsConnected(false);
  };

  useEffect(() => {
    // Initial data load
    loadData();

    // Connect to WebSocket for real-time updates (skip in test environment)
    if (import.meta.env.MODE !== 'test') {
      connectWebSocket();
    }

    // Fallback polling every 30 seconds (reduced frequency since we have WebSocket)
    // Use more frequent polling in test mode to simulate real-time behavior
    const pollInterval = import.meta.env.MODE === 'test' ? 1000 : 30000;
    const interval = setInterval(loadData, pollInterval);

    return () => {
      clearInterval(interval);
      if (import.meta.env.MODE !== 'test') {
        disconnectWebSocket();
      }
    };
  }, [namespace]);

  // Wrapper for sendMessage using WebSocket when available, fallback to HTTP
  const sendMessage = async (payload: MessageDto) => {
    try {
      if (stompClientRef.current?.connected && import.meta.env.MODE !== 'test') {
        // Send via WebSocket for real-time broadcast
        stompClientRef.current.send(`/app/state/${namespace}`, {}, JSON.stringify(payload));
      } else {
        // Fallback to HTTP API (always used in test mode)
        await apiService.sendMessage(namespace, payload);
        await loadData(); // Refresh after send for verifiability
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { state, messages, error, loading, sendMessage, isConnected };
};