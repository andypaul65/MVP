import { useState, useEffect } from 'react';
import { fetchState } from '@/services/apiService'; // Assuming a service for API calls; implement if needed

// DTO for individual messages (aligned with server-side MessageDto for JSON payloads)
export interface MessageDto {
  content: string; // Core message text; extensible for future properties (e.g., id, timestamp)
}

// Interface for the hook's return value (promotes type safety and extensibility)
export interface SystemState {
  state: string | null;
  messages: MessageDto[]; // Typed as array of MessageDto objects
  error: string | null;
  loading: boolean;
}

// Custom hook for namespace-specific state and message tracking
// Integrates with REST API via fetchState service; polls every 5 seconds for real-time updates
export const useSystemState = (namespace: string): SystemState => {
  const [state, setState] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchState(namespace); // e.g., GET /api/state/{namespace}
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: { state: string; messages: MessageDto[] } = await response.json();
      setState(data.state);
      setMessages(data.messages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setMessages([]); // Clear messages on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(); // Initial load

    // Poll for updates (extensible interval)
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [namespace]);

  return { state, messages, error, loading };
};