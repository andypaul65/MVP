import React from 'react';
import '../cyberpunk.css'; // Import cyberpunk theme

interface AnalyticsPanelProps {
    namespace: string;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ namespace }) => {
    return (
        <div className="cyberpunk-content">
            <h2>Analytics Panel - {namespace}</h2>
            <p>Placeholder for future analytics features.</p>
            <div className="debug-log">Data visualization coming soon...</div>
        </div>
    );
};

export default AnalyticsPanel;