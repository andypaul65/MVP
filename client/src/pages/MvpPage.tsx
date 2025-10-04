import React from 'react';
import TabbedInterface from '@/components/TabbedInterface';
import SystemTab from '@/components/SystemTab';
import LoginPanel from '@/components/LoginPanel';
import type { TabConfig } from '@/types/TabConfig';

// Entry point page for the MVP UI, rendering the tabbed interface with nested System tabs.
// Educational note: Demonstrates hierarchical component composition and encapsulation via nested tabs.
const MvpPage: React.FC = () => {
  const tabs: TabConfig[] = [
    { namespace: 'login', title: 'Login', component: LoginPanel },
    {
      namespace: 'system',
      title: 'System',
      component: SystemTab,
      // SystemTab will use default system tabs (Debug, Control, Analytics, Settings, Reports)
      // Children can be provided to override or customize the system tabs if needed
    },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="cyberpunk-header">MVP UI</h2>
      <TabbedInterface tabs={tabs} />
    </div>
  );
};

export default MvpPage;