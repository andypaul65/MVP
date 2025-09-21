import { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService'; // Adjusted import to match object export
import type { MessageDto } from '@/types/MessageDto'; // Assume existing DTO type

// Interface for the hook's return value (extended minimally)
export interface SystemState {
  state: string | null;
  messages: MessageDto[];
  error: string | null;
  loading: boolean;
  sendMessage: (payload: any) => Promise<void>; // Added for ControlPanel integration
}

// Custom hook for namespace-specific state and message tracking
export const useSystemState = (namespace: string): SystemState => {
  const [state, setState] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await apiService.fetchState(namespace); // Use new service method
      setState(data.state);
      setMessages(data.messages);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [namespace]);

  // Added minimally: Wrapper for sendMessage using existing service
  const sendMessage = async (payload: any) => {
    try {
      await apiService.sendMessage(namespace, payload);
      await loadData(); // Refresh after send for verifiability
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { state, messages, error, loading, sendMessage };
};