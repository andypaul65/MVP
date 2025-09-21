
### Stage 3 Primer: MVP Tabs (Debug and Control Panel)

## Introduction
As a seasoned Java developer familiar with backend architectures like Spring Boot's layered services, controllers, and dependency injection, Stage 3 extends the client-side foundation from prior stages into interactive panels. This mirrors Java's component-based design (e.g., beans for state management) but shifts to React's declarative paradigm, where UI updates are driven by state changes rather than imperative event handling. Components like `DebugPanel` and `ControlPanel` integrate with custom hooks for data fetching, akin to service layers in Java, while MSW mocks simulate REST responses without a running server.

This primer overviews Stage 3's outcomes, building on the tabbed interface from Stage 2, with a focus on namespace-specific features for debugging and control.

## Key Objectives and Outcomes
Stage 3 develops the MVP tabs, wiring them into `TabbedInterface` for extensible navigation. This emphasizes real-time state tracking and themed rendering, preparing for server integration in Stage 4.

### 1. **Type Definitions and DTOs**
   - **Concept Bridge**: Similar to Java DTOs (e.g., `MessageDto` for data transfer), TypeScript interfaces ensure type-safe payloads. `MessageDto` defines message structures for JSON handling.
   - **Implementation**: Defined in `src/types/MessageDto.ts` as:
     ```typescript
     export interface MessageDto {
       content: string;
     }
     ```
   - **Outcome**: Enables consistent data flow, extensible for future properties like IDs.

### 2. **Custom Hook: `useSystemState`**
   - **Concept Bridge**: Like a Java service bean with injected dependencies, this hook manages namespace-specific state using React's `useState` and `useEffect` (analogous to lifecycle methods).
   - **Implementation Details**:
     - Fetches data via `apiService.fetchState`, polls every 5 seconds for updates.
     - Returns typed state including `messages: MessageDto[]` and `sendMessage` function.
     ```typescript
     // Excerpt from src/hooks/useSystemState.ts
     import { useState, useEffect } from 'react';
     import { apiService } from '@/services/apiService';
     import type { MessageDto } from '@/types/MessageDto';

     export interface SystemState {
       state: string | null;
       messages: MessageDto[];
       error: string | null;
       loading: boolean;
       sendMessage: (payload: any) => Promise<void>;
     }

     export const useSystemState = (namespace: string): SystemState => {
       // State management and polling logic
       // ...
     };
     ```
   - **Outcome**: Provides reactive data, verifiable with MSW mocks.

### 3. **Components: `DebugPanel.tsx` and `ControlPanel.tsx`**
   - **Concept Bridge**: Comparable to Java views (e.g., JSPs with beans), these render dynamic content based on hook data.
   - **Implementation**: Use hook for state; map messages with `msg.content`.
     - Debug: Displays logs with error handling.
     - Control: Adds message sending button.
   - **Outcome**: Tabs render themed content (green accents on black), verifiable in browser.

### 4. **Service Layer: `apiService.ts`**
   - **Concept Bridge**: Mirrors Java services with methods for endpoints.
   - **Implementation**: Object with placeholders and `fetchState` for REST calls.
   - **Outcome**: Abstracts API, integrated with mocks for development.

## Lessons for Java Developers
- **Reactive State**: Hooks replace mutable fields; polling simulates event-driven updates.
- **Typing**: DTOs ensure safety, like Java annotations.
- **Verification**: Use `npm run build` and `npm test` to catch issues early.

## Next Steps
Stage 4 introduces the server skeleton. Experiment with sending messages to see updates.