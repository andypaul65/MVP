# MVP UI Design Specification

## Overview
This document defines the UI as a tabbed web page with extensible tabs (e.g., debug and control panels) linked to backend namespaces. The framework emphasizes modularity, type safety, and a cyberpunk theme (dark gray backgrounds #1E1E1E, black structural elements #000000, green accents #00FF00).

## Client Structure
- Folders: `src/components/`, `src/hooks/`, `src/services/`, `src/pages/`, `src/types/`.
- Custom Hooks: e.g., `useSystemState` for state and message tracking.
- Debugging: Integrate React DevTools and console logging.

## Server Structure
- Packages: `com.example.controllers/`, `com.example.services/`, `com.example.entities/`.
- Interfaces: e.g., `SystemStateService`.
- DTOs: e.g., `MessageDto` for JSON payloads supporting themed displays.
- Debugging: Configure Actuator endpoints.

## Key Components and Endpoints
- `TabbedInterface.tsx`: Implements tab navigation with `TabConfig` interface (namespace, title, component, optional hooks and styles). Apply cyberpunk theme via global CSS.
- Placeholder tabs for future features: AnalyticsPanel, SettingsPanel, ReportsPanel, demonstrating extensibility.
  - Example Snippet (TabbedInterface.tsx):
    ```tsx
    import React, { useState, useEffect } from 'react';
    import type { TabConfig } from '@/types/TabConfig';
    import '../cyberpunk.css'; // Cyberpunk theme: dark gray bg, green accents

    interface TabbedInterfaceProps {
      tabs: TabConfig[];
    }

    const TabbedInterface: React.FC<TabbedInterfaceProps> = ({ tabs }) => {
      const [activeTab, setActiveTab] = useState(0);
      useEffect(() => {
        tabs[activeTab]?.onTabMount?.();
      }, [activeTab]);

      return (
        <div className="cyberpunk-container">
          <div className="cyberpunk-tabs">
            {tabs.map((tab, index) => (
              <button
                key={tab.namespace}
                className={index === activeTab ? 'active-green' : ''}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="cyberpunk-content" style={tabs[activeTab]?.style}>
            <tabs[activeTab].component />
          </div>
        </div>
      );
    };

    export default TabbedInterface;
    ```
- API Endpoints: e.g., `/api/state/{namespace}` for RESTful communication.
  - Example Snippet (MvpController.java):
    ```java
    @RestController
    @RequestMapping("/api")
    public class MvpController {
      @Autowired
      private SystemStateService stateService;

      @GetMapping("/state/{namespace}")
      public ResponseEntity<MessageDto> getState(@PathVariable String namespace) {
        MessageDto dto = stateService.getState(namespace);
        return ResponseEntity.ok(dto); // Supports themed client rendering
      }

      @PostMapping("/message/{namespace}")
      public ResponseEntity<Void> sendMessage(@PathVariable String namespace, @RequestBody MessageDto message) {
        stateService.sendMessage(namespace, message);
        return ResponseEntity.accepted().build();
      }
    }
    ```

## Integration
Client hooks should use useEffect for server polling, ensuring state consistency like Java's scheduled tasks

## Testing Integration
- **Client-Side Unit**: Vitest + React Testing Library (preferred for Vite compatibility; avoids Jest's configuration overhead).
- **Server-Side Unit**: JUnit + Mockito.
- **API Mocking**: MSW for client-side integration tests.
- **Full-Stack**: Cypress for end-to-end verification, including theme consistency and extensibility.

## Additional Notes
- Ensure all elements support extensibility through hooks and optional props.
- Verify theme application via browser inspection and tests (e.g., color assertions).
- Vitest's native Vite support improves efficiency; configure with JSDOM for DOM-based tests.

## Key Terms
- **Namespace**: A scoped identifier for isolating state, tabs, or messages (e.g., "cyberpunk" for themed content).
- **Tabbed Interface**: The main UI component allowing dynamic tabs linked to namespaces.
- **Cyberpunk Theme**: Dark gray (#1E1E1E) backgrounds, black borders, green (#00FF00) accents.
- **Backplane**: The MVP framework's modular base layer for extensions.
- **Registry**: A system for dynamically registering services or components.

## See Also
- [Architecture](guidelines/architecture.md): High-level design details.
- [Framework Patterns](guidelines/framework-patterns.md): Extension mechanisms.
- [Subproject Integration Guide](subprojects/subproject-integration-guide.md): For building on this spec.
```