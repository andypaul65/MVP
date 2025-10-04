export interface TabConfig {
  namespace: string;
  title: string;
  component: React.ComponentType<{ namespace: string; children?: TabConfig[] }>;
  children?: TabConfig[]; // Optional nested tabs for hierarchical navigation
  onTabMount?: () => void;
  style?: React.CSSProperties;
}