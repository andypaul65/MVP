export interface TabConfig {
  namespace: string;
  title: string;
  component: React.FC;
  onTabMount?: () => void;
  style?: React.CSSProperties;
}