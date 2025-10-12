import type { TabConfig } from './TabConfig';

/**
 * Interface for registering and managing tabs dynamically.
 * Allows other projects to add custom tabs to the framework.
 */
export interface TabRegistry {
  /**
   * Registers a new tab configuration.
   * @param tab The tab configuration to register.
   */
  registerTab(tab: TabConfig): void;

  /**
   * Unregisters a tab by its namespace.
   * @param namespace The namespace of the tab to remove.
   */
  unregisterTab(namespace: string): void;

  /**
   * Retrieves all registered tabs.
   * @returns Array of registered TabConfig objects.
   */
  getRegisteredTabs(): TabConfig[];

  /**
   * Retrieves a tab by its namespace.
   * @param namespace The namespace to search for.
   * @returns The TabConfig if found, undefined otherwise.
   */
  getTabByNamespace(namespace: string): TabConfig | undefined;
}