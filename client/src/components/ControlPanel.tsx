import React, { useState } from 'react';
import { useSystemState } from '../hooks/useSystemState';
import '../cyberpunk.css'; // Import cyberpunk theme

// Props for ControlPanel
interface ControlPanelProps {
  namespace: string;
}

// Component for controlling the system: sending messages and displaying state.
// Educational note: Demonstrates form handling, async operations, and integration with custom hooks.
const ControlPanel: React.FC<ControlPanelProps> = ({ namespace }) => {
  const { state, messages, error, loading, sendMessage, isConnected } = useSystemState(namespace);
  const [inputMessage, setInputMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;
    setSending(true);
    try {
      await sendMessage({ content: inputMessage, namespace });
      setInputMessage(''); // Clear input after send
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  };

  const lastReceived = messages.length > 0 ? messages[messages.length - 1].content : 'No message received yet.';

  return (
    <div className="control-panel">
      <h2>Control Panel - {namespace}</h2>
      <div className="connection-status">
        <span className={isConnected ? 'status-connected' : 'status-disconnected'}>
          {isConnected ? '🟢 Connected (Real-time)' : '🟡 HTTP Mode'}
        </span>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="debug-log error">Error: {error}</p>}
      <div>
        <strong>Current State:</strong> {state || 'No state available'}
      </div>
      <div>
        <strong>Last Received:</strong>
        <div className="message-display">{lastReceived}</div>
      </div>
      <div>
        <input
          type="text"
          className="control-input"
          placeholder="Enter message to send..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="control-button"
          onClick={handleSend}
          disabled={sending || !inputMessage.trim()}
        >
          {sending ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;