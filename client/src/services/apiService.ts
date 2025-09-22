import type { MessageDto } from '@/types/MessageDto';
import type { HeartbeatDto } from '@/types/HeartbeatDto';

// API service for handling backend communication with TypeScript types derived from api-contracts.json.
// Centralizes API logic for reusability, testing, and type safety.
const BASE_URL = 'http://localhost:8080/api'; // Align with OpenAPI servers

export const apiService = {
  /**
   * Retrieves the current state for a specific namespace.
   * @param namespace The namespace identifier
   * @returns Promise<MessageDto>
   */
  getState: async (namespace: string): Promise<MessageDto> => {
    const response = await fetch(`${BASE_URL}/state/${namespace}`);
    if (!response.ok) {
      throw new Error(`Failed to get state: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Sends a message to a specific namespace.
   * @param namespace The namespace identifier
   * @param message The message payload
   * @returns Promise<MessageDto> The processed message
   */
  sendMessage: async (namespace: string, message: MessageDto): Promise<MessageDto> => {
    const response = await fetch(`${BASE_URL}/message/${namespace}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Health check to verify server availability.
   * @returns Promise<HeartbeatDto>
   */
  heartbeat: async (): Promise<HeartbeatDto> => {
    const response = await fetch(`${BASE_URL}/heartbeat`);
    if (!response.ok) {
      throw new Error(`Heartbeat failed: ${response.statusText}`);
    }
    return response.json();
  },
};