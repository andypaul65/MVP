
### General Standards
Adopt standards that prioritize readability, maintainability, and educational value. Code must be self-explanatory with comments explaining "why" over "what," especially for client-side technologies to support learning.

### Client-Side Standards (JavaScript, React, TypeScript, Node.js, Vite)
- **TypeScript Usage**: Always use interfaces for types (e.g., `interface Props { children: ReactNode; }`). Enable strict null checks in `tsconfig.json` for robustness.
- **React Components**: Favor functional components with hooks. Structure as:
  ```typescript
  import React from 'react';

  interface MyComponentProps {
    label: string; // Educational note: This prop ensures type safety for the component's input.
  }

  const MyComponent: React.FC<MyComponentProps> = ({ label }) => {
    // Hook usage explained: useState manages local state for clarity in debugging.
    const [state, setState] = React.useState('');

    return <div>{label}: {state}</div>;
  };

  export default MyComponent;
  ```
- **Node.js and Vite**: Use ES modules. Configure Vite for aliases (e.g., `@/components`) to simplify imports and debugging.
- **Error Handling and Debugging**: Wrap async operations in try-catch with meaningful logs (e.g., `console.error('API fetch failed:', error);`). Use ESLint with React and TypeScript plugins for static analysis.

### Server-Side Standards (Java, Spring Boot)
- **Java Conventions**: Follow Java 17+ standards with immutable objects where possible. Use interfaces for all services:
  ```java
  public interface DataService {
      // Method signature with Javadoc for clarity.
      /**
       * Retrieves data by ID. Throws exception if not found.
       * @param id The unique identifier.
       * @return The data object.
       */
      Data getById(long id);
  }
  ```
- **Spring Boot Practices**: Annotate appropriately (e.g., `@RestController`, `@Autowired`). Use Lombok for boilerplate reduction but explain its usage in comments.
- **Logging and Debugging**: Employ `@Slf4j` for logging. Standardize log messages (e.g., `log.info("Processing request for ID: {}", id);`).

### Cross-Cutting Concerns
- Version control commits must reference design specs or tests.
- Enforce code reviews focusing on clarity and extensibility.

