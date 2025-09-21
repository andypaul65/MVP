export interface TabConfig {
  namespace: string;
  title: string;
  component: React.ComponentType<{ namespace: string }>;
  onTabMount?: () => void;
  style?: React.CSSProperties;
}