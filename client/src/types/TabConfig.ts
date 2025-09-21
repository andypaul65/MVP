import React from 'react';

// Interface for extensible tab registration, allowing dynamic addition of tabs.
// Associates each tab with a namespace for message routing and potential backend integration.
export interface TabConfig {
  namespace: string; // Unique identifier for the tab, used for routing and state management.
  title: string; // Display title for the tab in the UI.
  component: React.FC; // React component to render for this tab.
}