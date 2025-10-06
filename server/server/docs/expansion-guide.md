# MVP Framework Expansion Guide

This document outlines the contracts and processes for extending the MVP framework as a base layer. It details JAR/NPM naming, lifecycle hooks, registry patterns, and integration examples for building applications on top of the framework.

## Overview

The MVP framework is designed as a modular base layer with:
- **Server Side**: Java Spring Boot library (JAR) for backend services.
- **Client Side**: React TypeScript library (NPM) for UI components.

Extensions are achieved through:
- **Registries**: Dynamic registration of tabs and services.
- **Abstract Classes**: Extension points for custom logic.
- **Lifecycle Hooks**: Callbacks for component/service lifecycles.
- **Namespaces**: Scoped isolation for extensions.

## Packaging and Naming

### Server JAR Naming
- **Library JAR**: `org.ajp.mvp:server:0.0.1-SNAPSHOT.jar`
  - Contains core services, controllers, DTOs.
  - Dependency for extending projects.
- **Executable JAR**: `org.ajp.mvp:server:0.0.1-SNAPSHOT-exec.jar`
  - Includes embedded server for standalone apps.
  - Not used when building on top of the base layer.

### Client NPM Naming
- **Package**: `@ajp/mvp-client@0.0.1`
- **Dist Files**:
  - `dist/index.js`: ESM bundle (externalizes React/React-DOM).
  - `dist/index.d.ts`: TypeScript definitions.
- **Build Command**: `npm run build` generates the library bundle.

## Core Interfaces and Contracts

### Server Contracts

#### ServiceRegistry Interface
```java
public interface ServiceRegistry {
    void registerService(String serviceName, Object service);
    void unregisterService(String serviceName);
    <T> T getService(String serviceName, Class<T> serviceClass);
    List<String> getRegisteredServiceNames();
}
```

#### AbstractSystemStateService
```java
public abstract class AbstractSystemStateService implements SystemStateService {
    protected MessageDto processMessage(String namespace, MessageDto message) {
        // Override for custom processing
        return message;
    }
    protected MessageDto getDefaultState(String namespace) {
        // Override for custom defaults
        return new MessageDto();
    }
    protected abstract void storeMessage(String namespace, MessageDto message);
}
```

### Client Contracts

#### TabRegistry Interface
```typescript
interface TabRegistry {
  registerTab(tab: TabConfig): void;
  unregisterTab(namespace: string): void;
  getRegisteredTabs(): TabConfig[];
  getTabByNamespace(namespace: string): TabConfig | undefined;
}
```

#### TabLifecycleHooks
```typescript
interface TabLifecycleHooks {
  onTabMount?: (namespace: string) => void;
  onTabUnmount?: (namespace: string) => void;
  onStateUpdate?: (namespace: string, state: any) => void;
}
```

#### TabConfig
```typescript
interface TabConfig {
  namespace: string;
  title: string;
  component: React.ComponentType<{ namespace: string; children?: TabConfig[] }>;
  children?: TabConfig[];
  hooks?: TabLifecycleHooks;
  style?: React.CSSProperties;
}
```

## Lifecycle and Connections

### Server Lifecycle
1. **Startup**: Framework loads with default `SystemStateServiceImpl`.
2. **Extension Registration**: Custom services registered via `ServiceRegistry`.
3. **Request Handling**: Controllers delegate to registered services by namespace.
4. **Message Processing**: Abstract methods allow custom logic per extension.

### Client Lifecycle
1. **Initialization**: `TabbedInterface` renders with initial tabs.
2. **Tab Activation**: `onTabMount` hook called for active tab.
3. **State Updates**: `useSystemState` fetches/polls server state.
4. **Extension Loading**: New tabs registered dynamically.
5. **Unmount**: `onTabUnmount` called when tab deactivated.

### Connections Between Server and Client
- **Namespaces**: Client tabs map to server endpoints (e.g., `/api/state/{namespace}`).
- **State Sync**: Client hooks poll server for namespace-specific state.
- **WebSocket**: Real-time updates via `/ws` endpoint.
- **Authentication**: JWT tokens shared between client/server.

## Extension Examples

### Adding a Custom Tab (Client)
```typescript
import { TabConfig, TabbedInterface } from '@ajp/mvp-client';
import React from 'react';

const customTab: TabConfig = {
  namespace: 'my-feature',
  title: 'My Feature',
  component: ({ namespace }) => <div>Custom content for {namespace}</div>,
  hooks: {
    onTabMount: (ns) => console.log(`Mounted ${ns}`),
    onTabUnmount: (ns) => console.log(`Unmounted ${ns}`),
  },
};

// In your app
const tabs = [/* existing tabs */, customTab];
<TabbedInterface tabs={tabs} />;
```

### Custom Service Implementation (Server)
```java
@Service
public class CustomSystemStateService extends AbstractSystemStateService {
    @Override
    protected MessageDto processMessage(String namespace, MessageDto message) {
        // Custom processing logic
        message.setContent("Processed: " + message.getContent());
        return message;
    }

    @Override
    protected void storeMessage(String namespace, MessageDto message) {
        // Custom storage (e.g., database)
        // ...
    }
}
```

### Registry Usage
```typescript
// Client: Register tab dynamically
import { TabRegistry } from '@ajp/mvp-client';
const registry: TabRegistry = /* implementation */;
registry.registerTab(customTab);

// Server: Register service
@Autowired
private ServiceRegistry registry;
registry.registerService("customState", new CustomSystemStateService());
```

## Building on Top of the Base Layer

### Maven Project Setup
```xml
<dependency>
    <groupId>org.ajp.mvp</groupId>
    <artifactId>server</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```

### NPM Project Setup
```bash
npm install @ajp/mvp-client react react-dom
```

### Project Structure Example
```
my-extension/
├── pom.xml (includes server JAR)
├── src/main/java/
│   └── com/mycompany/
│       ├── MyController.java
│       └── services/MyService.java (extends AbstractSystemStateService)
├── client/
│   ├── package.json (includes @ajp/mvp-client)
│   └── src/
│       ├── App.tsx (uses TabbedInterface)
│       └── components/MyTab.tsx
```

## Best Practices
- **Namespace Isolation**: Use unique namespaces to avoid conflicts.
- **Hook Overrides**: Implement abstract methods thoughtfully.
- **Registry Patterns**: Register extensions early in lifecycle.
- **Testing**: Extend base tests for custom logic.
- **Versioning**: Pin framework versions for stability.

## API Reference
- Server Endpoints: See `api-contracts.json`
- Client Components: Exported from `@ajp/mvp-client`
- DTOs: Shared between client/server for consistency.

This guide ensures consistent expansion. Refer to it for integrating new features.