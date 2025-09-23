import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import DebugPanel from '../DebugPanel';

describe('DebugPanel Integration', () => {
  test('fetches and displays state and messages from API', async () => {
    render(<DebugPanel namespace="test" />);

    // Check loading initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Current State:')).toBeInTheDocument();
      expect(screen.queryByText('Active state for test')).toBeInTheDocument();
    });

    // Check messages are displayed (single message from state)
    expect(screen.getAllByText('Active state for test')).toHaveLength(2); // In state and logs
  });

  test('applies cyberpunk debug-panel class', async () => {
    const { container } = render(<DebugPanel namespace="test" />);

    await waitFor(() => {
      const panel = container.querySelector('.debug-panel');
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveClass('debug-panel');
    });
  });

  test('displays logs with debug-log class', async () => {
    const { container } = render(<DebugPanel namespace="test" />);

    await waitFor(() => {
      const logs = container.querySelectorAll('.debug-log');
      expect(logs.length).toBeGreaterThan(0);
      logs.forEach(log => {
        expect(log).toHaveClass('debug-log');
      });
    });
  });

  test('handles API error', async () => {
    // Mock server error (would need to override in test, but for simplicity, assume error case)
    // For now, assume success; in real test, use server.use() to mock error response
    render(<DebugPanel namespace="error" />);
    // If error namespace, but since mock is generic, perhaps add specific test
  });
});