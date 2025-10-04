import React from 'react';
import TabbedInterface from './TabbedInterface';
import DebugPanel from './DebugPanel';
import ControlPanel from './ControlPanel';
import AnalyticsPanel from './AnalyticsPanel';
import SettingsPanel from './SettingsPanel';
import ReportsPanel from './ReportsPanel';
import type { TabConfig } from '@/types/TabConfig';

// Props for SystemTab component
interface SystemTabProps {
  namespace: string; // The system instance namespace (e.g., 'system1', 'system2')
  children?: TabConfig[]; // Optional override of default system tabs
}

// Component that manages a system instance with nested tabs for different operations.
// Educational note: Demonstrates hierarchical component composition and namespace isolation.
const SystemTab: React.FC<SystemTabProps> = ({ namespace, children }) => {
  // Default system tabs if none provided
  const defaultSystemTabs: TabConfig[] = [
    {
      namespace: `${namespace}-debug`,
      title: 'Debug',
      component: DebugPanel
    },
    {
      namespace: `${namespace}-control`,
      title: 'Control Panel',
      component: ControlPanel
    },
    {
      namespace: `${namespace}-analytics`,
      title: 'Analytics',
      component: AnalyticsPanel
    },
    {
      namespace: `${namespace}-settings`,
      title: 'Settings',
      component: SettingsPanel
    },
    {
      namespace: `${namespace}-reports`,
      title: 'Reports',
      component: ReportsPanel
    },
  ];

  // Use provided children or default system tabs
  const systemTabs = children || defaultSystemTabs;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', backgroundColor: '#1E1E1E', borderBottom: '1px solid #000000' }}>
        <h3 style={{ color: '#00FF00', margin: '0 0 10px 0' }}>
          System: {namespace}
        </h3>
        <p style={{ color: '#00FF00', margin: 0, fontSize: '14px' }}>
          Manage system operations and monitoring
        </p>
      </div>
      <TabbedInterface tabs={systemTabs} />
    </div>
  );
};

export default SystemTab;