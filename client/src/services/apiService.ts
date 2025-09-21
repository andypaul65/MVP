import type { MessageDto } from '@/types/MessageDto';

// API service for handling backend communication.
// Educational note: Centralizes API logic for reusability and testing.
// TODO: Implement actual fetch calls with error handling.
export const apiService = {
  getState: async (namespace: string) => {
    // Placeholder: Simulate API response.
    console.log(`[DEBUG] API getState for ${namespace}`);
    return { data: `State for ${namespace}`, error: null };
  },
  sendMessage: async (namespace: string, payload: any) => {
    console.log(`[DEBUG] API sendMessage to ${namespace}:`, payload);
    return { success: true, error: null };
  },
  heartbeat: async () => {
    console.log('[DEBUG] API heartbeat');
    return { status: 'alive' };
  },
  // Added minimally for useSystemState integration: Fetches state via REST
  fetchState: async (namespace: string): Promise<{ state: string; messages: MessageDto[] }> => {
    console.log(`[DEBUG] API fetchState for ${namespace}`);
    const response = await fetch(`/api/state/${namespace}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};