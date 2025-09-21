import React, { useState, useEffect } from 'react';
import '../cyberpunk.css'; // Applies global cyberpunk theme: dark gray background, green text for cyberpunk aesthetic.
import type { TabConfig } from '@/types/TabConfig'; // Interface for type-safe tab configs.

interface TabbedInterfaceProps {
  tabs: TabConfig[]; // Array of tabs for extensibility.
}

const TabbedInterface: React.FC<TabbedInterfaceProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0); // Manages active tab index for simple navigation.

  useEffect(() => {
    // Extension hook: Call onTabMount for namespace-specific initialization when tab becomes active.
    if (tabs[activeTab]?.onTabMount) {
      tabs[activeTab].onTabMount!();
    }
  }, [activeTab, tabs]);

  return (
    <div className="cyberpunk-container"> {/* Applies dark gray background and green accents */}
      <ul className="cyberpunk-tabs">
        {tabs.map((tab, index) => (
          <li
            key={tab.namespace}
            onClick={() => setActiveTab(index)}
            className={index === activeTab ? 'active-green' : ''}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className="cyberpunk-content" style={tabs[activeTab]?.style}>
        {React.createElement(tabs[activeTab].component)}
      </div>
    </div>
  );
};

export default TabbedInterface;