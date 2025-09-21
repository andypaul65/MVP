import React from 'react';
import { useSystemState } from '../hooks/useSystemState';
import '../cyberpunk.css'; // Import cyberpunk theme

// Props for DebugPanel
interface DebugPanelProps {
    namespace: string;
}

// Component for displaying runtime information such as current state and logs.
// Educational note: Demonstrates integration with custom hooks for real-time data fetching and polling.
const DebugPanel: React.FC<DebugPanelProps> = ({ namespace }) => {
    const { state, messages, error, loading } = useSystemState(namespace);

    return (
        <div className="debug-panel">
            <h2>Debug Panel - {namespace}</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="debug-log error">Error: {error}</p>}
            <div>
                <strong>Current State:</strong> {state || 'No state available'}
            </div>
            <div>
                <strong>Logs:</strong>
                <div>
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div key={index} className="debug-log">
                                {typeof msg === 'string' ? msg : msg.content} {/* Handle both string and object messages */}
                            </div>
                        ))
                    ) : (
                        <div className="debug-log">No messages yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DebugPanel;