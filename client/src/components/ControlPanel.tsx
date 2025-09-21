import React from 'react';

// Component showing system state, last sent message, and last received message from the backend.
// Educational note: This illustrates tracking messages and real-time updates via hooks.
const ControlPanel: React.FC = () => {
  // Hook usage: useState to track messages; extend with useSystemState for backend integration.
  const [lastSent, setLastSent] = React.useState('No message sent yet.');
  const [lastReceived, setLastReceived] = React.useState('No message received yet.');

  React.useEffect(() => {
    console.log('[DEBUG] ControlPanel loaded'); // Educational: Console logging for debugging.
  }, []);

  return (
    <div>
      <h2>Control Panel</h2>
      <p>Last Sent: {lastSent}</p>
      <p>Last Received: {lastReceived}</p>
    </div>
  );
};

export default ControlPanel;