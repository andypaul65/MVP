// MVP Client Library Exports
// This file defines the public API for the @ajp/mvp-client library.
// Other projects can import these to extend and customize the UI.

export { default as TabbedInterface } from './components/TabbedInterface';
export { default as SystemTab } from './components/SystemTab';
export { default as ErrorBoundary } from './components/ErrorBoundary';
export type { TabConfig } from './types/TabConfig';
export type { TabRegistry } from './types/TabRegistry';
export type { TabLifecycleHooks } from './types/TabLifecycleHooks';
export type { MessageDto } from './types/MessageDto';
export type { HeartbeatDto } from './types/HeartbeatDto';
export { useSystemState } from './hooks/useSystemState';
export { apiService } from './services/apiService';
export { AuthProvider, useAuth } from './contexts/AuthContext';