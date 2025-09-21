# MVP UI Design Specification

## Overview
This design specifies a Minimum Viable Product (MVP) user interface for the client-server framework, adhering to the core principles of modularity, clarity, extensibility, and debugging support outlined in the architecture documentation. The UI is structured as a tabbed web page built with React and TypeScript, ensuring type safety and educational inline comments. It integrates with the server via RESTful APIs, incorporating hooks for future extensions. The design emphasizes testing integration and debugging hooks from the outset.

Key features include:
- A debug tab displaying available runtime information.
- A control panel tab showing system state, including the last message sent to and received from the backend.
- Extensible tabs for future features, each with a unique namespace linked to backend messages and objects.

This design serves as a foundational module, with abstractions allowing easy addition of tabs via configuration. Development will follow iterative workflows, starting with this spec, followed by code, tests, and documentation.

## Client-Side Design (React, TypeScript, Vite)

### Structure
Organize the client code under `src/` as follows:
- `src/components/`: Reusable UI elements, e.g., `TabbedInterface.tsx` for the core tab structure.
- `src/hooks/`: Custom hooks, e.g., `useSystemState.ts` for managing state and API interactions.
- `src/services/`: API services, e.g., `apiService.ts` for handling backend communication.
- `src/pages/`: Top-level pages, with `MvpPage.tsx` as the entry point.
- `src/types/`: Shared interfaces, e.g., `TabConfig.ts` for tab definitions.

Use Vite for development, with aliases configured (e.g., `@components` resolving to `src/components`) to enhance import clarity.

### Key Abstractions
- Define `interface TabConfig { namespace: string; title: string; component: React.FC; }` for extensible tab registration. This allows dynamic addition of tabs, associating each with a namespace for message routing.
- Implement a base `TabbedInterface` component that accepts an array of `TabConfig` objects, rendering tabs via React Tabs or a similar library (if needed; otherwise, use native state management for simplicity).
- Use custom hooks like `useApiFetch` for data retrieval, with types ensuring consistency (e.g., `interface ApiResponse<T> { data: T; error?: string; }`).

### Extension Hooks
- Provide an `onTabMount` callback in `TabConfig` for namespace-specific initialization, e.g., subscribing to backend events tied to the namespace.
- Allow overriding tab rendering via abstract props, enabling custom behavior without modifying core logic.

### Debugging Hooks
- Integrate React DevTools and console logging with prefixed messages (e.g., `[DEBUG] Tab loaded: namespace`).
- Embed an error boundary around the tabbed interface for graceful error handling, logging to the debug tab.
- Use TypeScript strict mode and source maps for error tracing.

### MVP Tab Implementations
- **Debug Tab** (namespace: "debug"):
  - Displays runtime information such as current state from hooks, API response logs, and system metrics (e.g., via `useSystemState`).
  - Component: `DebugPanel.tsx`, using `useEffect` to poll or subscribe to updates, with comments explaining state management.
- **Control Panel Tab** (namespace: "control"):
  - Shows system state, last sent message (e.g., JSON payload), and last received message from the backend.
  - Component: `ControlPanel.tsx`, leveraging `useSystemState` to track messages, with real-time updates via WebSockets or polling if extended later.
- **Future Feature Tabs** (namespaces: e.g., "feature1", "feature2"):
  - Placeholder components like `FeatureTab.tsx`, configured via `TabConfig` array.
  - Each namespace maps to backend objects/messages, e.g., routing API calls like `/api/{namespace}/action`.

### Example Code Snippet (TabbedInterface.tsx)
```typescript
import React, { useState } from 'react';
import { TabConfig } from '../types/TabConfig'; // Interface for type-safe tab configs.

interface TabbedInterfaceProps {
  tabs: TabConfig[]; // Array of tabs for extensibility.
}

const TabbedInterface: React.FC<TabbedInterfaceProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0); // Manages active tab index for simple navigation.

  return (
    <div>
      <ul>
        {tabs.map((tab, index) => (
          <li key={tab.namespace} onClick={() => setActiveTab(index)}>
            {tab.title}
          </li>
        ))}
      </ul>
      <div>{React.createElement(tabs[activeTab].component)}</div>
    </div>
  );
};

export default TabbedInterface;
```

## Server-Side Design (Java, Spring Boot)

### Structure
Organize into packages:
- `com.example.controllers`: e.g., `MvpController.java` for handling tab-related requests.
- `com.example.services`: e.g., `SystemStateService.java` implementing `SystemStateServiceInterface`.
- `com.example.entities`: DTOs like `MessageDto` for consistent data transfer.

### Key Abstractions
- Define `public interface SystemStateService { MessageDto getLastSentMessage(String namespace); MessageDto getLastReceivedMessage(String namespace); }` for namespace-specific state queries.
- Use DTOs like `public class MessageDto { private String namespace; private String payload; private Timestamp timestamp; }` to ensure consistency with client-side types.

### Extension Hooks
- Abstract base controller with overridable methods for namespace routing, e.g., `protected ResponseEntity<?> handleNamespaceRequest(String namespace, RequestBody body)`.
- Support custom middleware via Spring interceptors for authentication or logging tied to namespaces.

### Debugging Hooks
- Enable Actuator endpoints (e.g., `/actuator/health`, `/actuator/info`) configured in `application.properties`.
- Use SLF4J logging for message tracking, e.g., `log.info("Message received for namespace: {}", namespace);`.

### Communication Layer
- REST endpoints: e.g., `GET /api/state/{namespace}` returns system state; `POST /api/message/{namespace}` handles messages.
- Use JSON for payloads, with shared DTOs ensuring alignment between client and server.
- Include heartbeat endpoint `/api/heartbeat` for client polling.

## Testing Integration

### Unit Testing
- Client: Use Jest to test `TabbedInterface` rendering and hook behaviors, e.g., asserting tab switches update state.
- Server: Use JUnit/Mockito to mock services and verify namespace-specific responses.

### Integration Testing
- Client: Mock APIs with MSW to simulate backend responses for tabs.
- Server: Use `@SpringBootTest` to validate endpoints with example data fixtures.
- Full Stack: Employ Cypress to test tab interactions and message flows.

## Development Workflow
- Reference this spec in commits.
- Iteratively implement client tabs, server endpoints, tests, and comments.
- Enforce code reviews for adherence to standards, focusing on extensibility via namespaces.