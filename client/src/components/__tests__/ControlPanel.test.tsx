import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ControlPanel from '../ControlPanel';

describe('ControlPanel Integration', () => {
  test('fetches and displays state and last message', async () => {
    render(<ControlPanel namespace="control" />);

    await waitFor(() => {
      expect(screen.getByText('Current State:')).toBeInTheDocument();
      // Check that state text appears in both sections
      const stateElements = screen.getAllByText('Active state for control');
      expect(stateElements).toHaveLength(2);
    });

    // Verify the text appears in both Current State and Last Received sections
    expect(screen.getByText('Current State:')).toBeInTheDocument();
    expect(screen.getByText('Last Received:')).toBeInTheDocument();
  });

  test('sends message and clears input', async () => {
    render(<ControlPanel namespace="control" />);

    const input = screen.getByPlaceholderText('Enter message to send...');
    const button = screen.getByRole('button', { name: 'Send Message' });

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);

    // Button should show sending
    expect(screen.getByText('Sending...')).toBeInTheDocument();

    // After send, input cleared (assuming success)
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  test('applies control-panel class', async () => {
    const { container } = render(<ControlPanel namespace="control" />);

    await waitFor(() => {
      const panel = container.querySelector('.control-panel');
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveClass('control-panel');
    });
  });

  test('input and button have cyberpunk classes', () => {
    render(<ControlPanel namespace="control" />);

    const input = screen.getByPlaceholderText('Enter message to send...');
    const button = screen.getByRole('button', { name: 'Send Message' });

    expect(input).toHaveClass('control-input');
    expect(button).toHaveClass('control-button');
  });

  test('message display has themed class', async () => {
    const { container } = render(<ControlPanel namespace="control" />);

    await waitFor(() => {
      const display = container.querySelector('.message-display');
      expect(display).toBeInTheDocument();
      expect(display).toHaveClass('message-display');
    });
  });
});