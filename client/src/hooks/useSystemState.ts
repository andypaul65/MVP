import { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService'; // Adjusted import to match object export
import type { MessageDto } from '@/types/MessageDto'; // Assume existing DTO type

// Interface for the hook's return value
export interface SystemState {
  state: string | null;
  messages: MessageDto[]; // Current state as message array
  error: string | null;
  loading: boolean;
  sendMessage: (payload: MessageDto) => Promise<void>;
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
      const dto = await apiService.getState(namespace);
      setState(dto.content);
      setMessages([dto]); // Current state as the latest message
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

  // Wrapper for sendMessage using updated service
  const sendMessage = async (payload: MessageDto) => {
    try {
      await apiService.sendMessage(namespace, payload);
      await loadData(); // Refresh after send for verifiability
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { state, messages, error, loading, sendMessage };
};