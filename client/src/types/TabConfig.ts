import type { TabLifecycleHooks } from './TabLifecycleHooks';

export interface TabConfig {
  namespace: string;
  title: string;
  component: React.ComponentType<{ namespace: string; children?: TabConfig[] }>;
  children?: TabConfig[]; // Optional nested tabs for hierarchical navigation
  hooks?: TabLifecycleHooks; // Optional lifecycle hooks for custom behavior
  style?: React.CSSProperties;
}