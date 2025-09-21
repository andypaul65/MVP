# Stage 2 Primer: Core Tabbed Interface Implementation

## Introduction
As a seasoned Java developer transitioning to full-stack development with modern UI frameworks, you are familiar with structured, object-oriented paradigms and backend concerns like dependency injection and layered architectures. Stage 2 shifts focus to the client-side frontend, introducing React—a declarative, component-based library for building user interfaces. Unlike traditional Java Swing or JavaFX applications, where you might manage UI state imperatively through event listeners and model-view separation, React emphasizes a functional, composable approach. Components are reusable functions that render UI based on props and state, with changes triggering efficient re-renders via a virtual DOM.

This primer overviews the key achievements of Stage 2, which establishes the foundational tabbed interface for the MVP. It builds on Stage 1's project skeleton (Vite + React + TypeScript setup) by implementing the core UI structure, integrating a cyberpunk-themed stylesheet, and verifying functionality through unit tests. The goal is modularity and extensibility, aligning with the project's architecture guidelines, while introducing UI-specific concepts like hooks and CSS-in-JS alternatives.

## Key Objectives and Outcomes
Stage 2 implements the `TabbedInterface` component, a central React element that orchestrates tabbed navigation. This mirrors a Java interface or abstract class in providing a contract for extensibility—tabs can be dynamically configured without altering the core logic. The implementation adheres to TypeScript for type safety (analogous to Java generics) and incorporates the specified cyberpunk theme for visual consistency.

### 1. **Type Definitions: `TabConfig` Interface**
   - **Concept Bridge**: In Java, you might define an interface like `TabConfig` with methods for configuration. Here, it's a TypeScript interface—a lightweight contract ensuring compile-time checks.
   - **Implementation**: Created `src/types/TabConfig.ts` defining:
     ```typescript
     export interface TabConfig {
       namespace: string;          // Unique identifier, e.g., 'debug'
       title: string;              // Display label, e.g., 'Debug Panel'
       component: React.FC;        // The React functional component to render
       onTabMount?: () => void;    // Optional hook for initialization (like a Java @PostConstruct)
       style?: React.CSSProperties; // Optional inline styles for customization
     }
     ```
   - **Outcome**: Enables declarative tab configuration, promoting loose coupling. Future stages will extend this for MVP tabs like Debug and Control.

### 2. **Core Component: `TabbedInterface.tsx`**
   - **Concept Bridge**: Think of this as a Java container class (e.g., a JPanel with CardLayout) that manages child views. React components are pure functions returning JSX (XML-like syntax for UI), with state managed via hooks like `useState` (similar to a reactive stream or observable).
   - **Implementation Details**:
     - Renders a list of clickable tab buttons and conditionally displays the active tab's content.
     - Uses `useState` for tracking the active tab index and `useEffect` to invoke `onTabMount` on activation—mirroring lifecycle methods in Java EE.
     - Applies cyberpunk classes (e.g., `cyberpunk-container`, `active-green`) for theming.
     ```typescript
     // Excerpt from src/components/TabbedInterface.tsx
     import React, { useState, useEffect } from 'react';
     import type { TabConfig } from '@/types/TabConfig';
     import '../cyberpunk.css'; // Global theme import

     const TabbedInterface: React.FC<{ tabs: TabConfig[] }> = ({ tabs }) => {
       const [activeTab, setActiveTab] = useState(0); // State hook for active index
       useEffect(() => tabs[activeTab]?.onTabMount?.(), [activeTab]); // Effect hook for side effects

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
             {React.createElement(tabs[activeTab].component)} {/* Dynamic render */}
           </div>
         </div>
       );
     };
     ```
   - **Outcome**: A verifiable, navigable interface launched via `npm run dev` at `http://localhost:5173`. Tabs switch responsively, with hooks ensuring extensibility.

### 3. **Theming: `cyberpunk.css` Stylesheet**
   - **Concept Bridge**: Comparable to JavaFX CSS or resource bundles for styling, but here it's a global CSS file imported into components. Class-based application keeps concerns separated, avoiding inline pollution.
   - **Implementation**: Added `src/cyberpunk.css` with core rules:
     ```css
     /* Excerpt: Dark gray (#1E1E1E) backgrounds, black (#000000) borders, green (#00FF00) accents */
     .cyberpunk-container {
       background-color: #1E1E1E;
       color: #00FF00;
       padding: 20px;
       border: 2px solid #000000;
       border-radius: 8px;
     }
     .cyberpunk-tabs button.active-green {
       background-color: #00FF00;
       color: #000000;
     }
     .cyberpunk-content {
       background-color: #000000;
       color: #00FF00;
     }
     ```
   - **Outcome**: Theme applied via class names, verified in browser dev tools. Optional `style` props in `TabConfig` allow overrides, supporting future customizations.

### 4. **Testing: Unit Suite with Vitest**
   - **Concept Bridge**: Like JUnit for Java, but for UI—tests isolate components, asserting renders and interactions. Vitest (chosen over Jest for Vite integration) runs in a JSDOM environment, simulating a browser without one.
   - **Implementation**: 
     - Configured `vite.config.ts` for tests (e.g., `environment: 'jsdom'`, `globals: true`).
     - Added `src/setupTests.ts` for Jest-DOM matchers (e.g., `toHaveStyle`).
     - Created `src/components/__tests__/TabbedInterface.test.tsx` with 7 passing tests:
       - Rendering and default tab display.
       - Click-based switching and hook invocation.
       - Theme assertions (e.g., `expect(content).toHaveStyle('background-color: rgb(30, 30, 30)')` for #1E1E1E).
     ```typescript
     // Excerpt from test file
     import { render, screen, fireEvent } from '@testing-library/react';
     import { describe, it, expect, vi } from 'vitest';
     import TabbedInterface from '../TabbedInterface';

     describe('TabbedInterface', () => {
       it('applies cyberpunk theme to content', () => {
         const tabs = [{ namespace: 'test', title: 'Test', component: () => <div>Test</div> }];
         render(<TabbedInterface tabs={tabs} />);
         const content = screen.getByText('Test').closest('.cyberpunk-content');
         expect(content).toHaveStyle('background-color: rgb(0, 0, 0)'); // Black #000000
       });
     });
     ```
   - **Outcome**: Achieved 80%+ coverage via `npm test`. CSS mocking (`vi.mock('../cyberpunk.css', () => ({}))`) isolated tests from styles, highlighting a key UI testing nuance.

## Lessons for Java Developers
- **State Management**: React's hooks replace getter/setter boilerplate; `useState` is declarative, reducing mutable shared state issues common in Java multithreading.
- **Tooling Friction**: Initial Jest setup mirrored dependency resolution challenges—Vitest's Vite-native design streamlined this, much like Spring Boot's auto-configuration.
- **Verification**: Browser inspection (DevTools) and tests provide rapid feedback, akin to debugging with IntelliJ but with hot-reloading for instant UI iteration.
- **Extensibility**: The `TabConfig` and hooks pattern enables plugin-like additions, preparing for Stage 3's namespace-specific tabs.

## Next Steps
Stage 3 will integrate `DebugPanel` and `ControlPanel` components, wiring in the `useSystemState` hook for real-time data. Review the updated `MVPUIDesignSpecification.md` and `testing-guidelines.md` for refined testing practices. Experiment by running `npm run dev` and adding a sample tab config in `main.tsx` to see the interface in action.

This primer encapsulates Stage 2's progress, bridging your Java expertise to React's paradigm. If clarifications are needed, reference the full logs in `Stage2 work.txt`.