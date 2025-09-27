import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSystemState } from '../useSystemState';
import { apiService } from '@/services/apiService';
import type { MessageDto } from '@/types/MessageDto';

// Mock apiService
vi.mock('@/services/apiService', () => ({
  apiService: {
    getState: vi.fn(),
    sendMessage: vi.fn(),
  },
}));

describe('useSystemState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with loading true and no state', async () => {
    (apiService.getState as any).mockResolvedValue({ content: 'Initial', namespace: 'test' });

    const { result } = renderHook(() => useSystemState('test'));

    // Initial synchronous state
    expect(result.current.loading).toBe(true);
    expect(result.current.state).toBe(null);
    expect(result.current.messages).toEqual([]);
    expect(result.current.error).toBe(null);

    // Wait for async load to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should load state on mount and update state', async () => {
    const mockDto: MessageDto = { content: 'Loaded state', namespace: 'test' };
    (apiService.getState as any).mockResolvedValue(mockDto);

    const { result } = renderHook(() => useSystemState('test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(apiService.getState).toHaveBeenCalledWith('test');
    expect(result.current.state).toBe('Loaded state');
    expect(result.current.messages).toEqual([mockDto]);
    expect(result.current.error).toBe(null);
  });

  it('should set error on load failure', async () => {
    const errorMessage = 'Network error';
    (apiService.getState as any).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useSystemState('test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.state).toBe(null);
  });

  it('should send message and reload state', async () => {
    const initialDto: MessageDto = { content: 'Initial', namespace: 'test' };
    const sentMessage: MessageDto = { content: 'New message', namespace: 'test' };
    const updatedDto: MessageDto = { content: 'egassem weN', namespace: 'test' }; // Reversed

    (apiService.getState as any)
      .mockResolvedValueOnce(initialDto)
      .mockResolvedValueOnce(updatedDto);
    (apiService.sendMessage as any).mockResolvedValue(updatedDto);

    const { result } = renderHook(() => useSystemState('test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.sendMessage(sentMessage);
    });

    expect(apiService.sendMessage).toHaveBeenCalledWith('test', sentMessage);
    expect(apiService.getState).toHaveBeenCalledTimes(2); // Initial load and after send
    expect(result.current.state).toBe('egassem weN'); // Reversed
    expect(result.current.messages).toEqual([updatedDto]);
  });

  it('should set error on send failure', async () => {
    const initialDto: MessageDto = { content: 'Initial', namespace: 'test' };
    const sentMessage: MessageDto = { content: 'New message', namespace: 'test' };
    const errorMessage = 'Send failed';

    (apiService.getState as any).mockResolvedValue(initialDto);
    (apiService.sendMessage as any).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useSystemState('test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.sendMessage(sentMessage);
    });

    expect(result.current.error).toBe(errorMessage);
  });

  it('should not throw error on unmount without WebSocket connection', () => {
    // Test that cleanup doesn't fail if WebSocket was never connected
    const { unmount } = renderHook(() => useSystemState('test'));

    // This should not throw an error
    expect(() => unmount()).not.toThrow();
  });
});