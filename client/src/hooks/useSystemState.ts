import { useState, useEffect, useCallback } from 'react';

// Define types for API responses
interface MessageDto {
  state: string;
  messages: string[];
}

// Custom hook for managing system state and API interactions.
// Educational note: Demonstrates useState and useEffect for data fetching, polling for real-time updates, and useCallback for memoized functions.
export const useSystemState = (namespace: string) => {
  const [state, setState] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch state and messages from API
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/state/${namespace}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: MessageDto = await response.json();
      setState(data.state);
      setMessages(data.messages);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [namespace]);

  // Function to send a message
  const sendMessage = useCallback(async (message: string) => {
    try {
      const response = await fetch(`/api/message/${namespace}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // After sending, fetch updated data to reflect changes
      await fetchData();
    } catch (err) {
      setError((err as Error).message);
    }
  }, [namespace, fetchData]);

  // Initial fetch and polling for real-time updates
  useEffect(() => {
    fetchData(); // Initial load

    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds for real-time updates
    return () => clearInterval(interval); // Cleanup on unmount or namespace change
  }, [fetchData]);

  return { state, messages, error, loading, sendMessage };
};