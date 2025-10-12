/**
 * Interface for lifecycle hooks on tabs.
 * Allows custom logic during tab mount, unmount, and state changes.
 */
export interface TabLifecycleHooks {
  /**
   * Called when the tab is mounted/active.
   * @param namespace The tab's namespace.
   */
  onTabMount?: (namespace: string) => void;

  /**
   * Called when the tab is unmounted/inactive.
   * @param namespace The tab's namespace.
   */
  onTabUnmount?: (namespace: string) => void;

  /**
   * Called when the tab's state updates.
   * @param namespace The tab's namespace.
   * @param state The updated state.
   */
  onStateUpdate?: (namespace: string, state: any) => void;
}