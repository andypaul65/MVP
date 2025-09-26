import React from 'react';
import '../cyberpunk.css'; // Import cyberpunk theme

interface SettingsPanelProps {
    namespace: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ namespace }) => {
    return (
        <div className="cyberpunk-content">
            <h2>Settings Panel - {namespace}</h2>
            <p>Placeholder for configuration and settings.</p>
            <div className="debug-log">Theme and preferences management coming soon...</div>
        </div>
    );
};

export default SettingsPanel;