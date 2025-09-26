import React from 'react';
import '../cyberpunk.css'; // Import cyberpunk theme

interface ReportsPanelProps {
    namespace: string;
}

const ReportsPanel: React.FC<ReportsPanelProps> = ({ namespace }) => {
    return (
        <div className="cyberpunk-content">
            <h2>Reports Panel - {namespace}</h2>
            <p>Placeholder for reporting and exports.</p>
            <div className="debug-log">PDF and data export features coming soon...</div>
        </div>
    );
};

export default ReportsPanel;