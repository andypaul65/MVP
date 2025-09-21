import React from 'react';
import TabbedInterface from '@/components/TabbedInterface';
import DebugPanel from '@/components/DebugPanel';
import ControlPanel from '@/components/ControlPanel';
import { TabConfig } from '@/types/TabConfig';

// Entry point page for the MVP UI, rendering the tabbed interface.
// Educational note: Demonstrates component composition and extensibility via TabConfig.
const MvpPage: React.FC = () => {
  const tabs: TabConfig[] = [
    { namespace: 'debug', title: 'Debug', component: DebugPanel },
    { namespace: 'control', title: 'Control Panel', component: ControlPanel },
    // Future: Add more tabs here, e.g., { namespace: 'feature1', title: 'Feature 1', component: FeatureTab }
  ];

  return (
    <div>
      <h1>MVP UI</h1>
      <TabbedInterface tabs={tabs} />
    </div>
  );
};

export default MvpPage;