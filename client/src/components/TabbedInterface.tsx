import React, { useState } from 'react';
import { TabConfig } from '@/types/TabConfig'; // Interface for type-safe tab configs.

interface TabbedInterfaceProps {
  tabs: TabConfig[]; // Array of tabs for extensibility.
}

const TabbedInterface: React.FC<TabbedInterfaceProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0); // Manages active tab index for simple navigation.

  return (
    <div>
      <ul>
        {tabs.map((tab, index) => (
          <li key={tab.namespace} onClick={() => setActiveTab(index)}>
            {tab.title}
          </li>
        ))}
      </ul>
      <div>{React.createElement(tabs[activeTab].component)}</div>
    </div>
  );
};

export default TabbedInterface;