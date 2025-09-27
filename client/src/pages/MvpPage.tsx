import React from 'react';
import TabbedInterface from '@/components/TabbedInterface';
import DebugPanel from '@/components/DebugPanel';
import ControlPanel from '@/components/ControlPanel';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import SettingsPanel from '@/components/SettingsPanel';
import ReportsPanel from '@/components/ReportsPanel';
import LoginPanel from '@/components/LoginPanel';
import type { TabConfig } from '@/types/TabConfig';

// Entry point page for the MVP UI, rendering the tabbed interface.
// Educational note: Demonstrates component composition and extensibility via TabConfig.
const MvpPage: React.FC = () => {
  const tabs: TabConfig[] = [
    { namespace: 'login', title: 'Login', component: LoginPanel },
    { namespace: 'debug', title: 'Debug', component: DebugPanel },
    { namespace: 'control', title: 'Control Panel', component: ControlPanel },
    { namespace: 'analytics', title: 'Analytics', component: AnalyticsPanel },
    { namespace: 'settings', title: 'Settings', component: SettingsPanel },
    { namespace: 'reports', title: 'Reports', component: ReportsPanel },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="cyberpunk-header">MVP UI</h2>
      <TabbedInterface tabs={tabs} />
    </div>
  );
};

export default MvpPage;