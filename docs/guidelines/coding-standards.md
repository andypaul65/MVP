# Coding Standards

This document outlines the coding standards and best practices for the MVP project. It ensures consistency, maintainability, and scalability across all contributions. Adherence to these guidelines is mandatory during code generation (e.g., via tools like grok-code-fast) and manual implementations, with a post-generation review required to verify compliance.

## Project Initialization and Dependencies

To establish a robust foundation, follow these steps immediately after scaffolding the project (e.g., via `npm init vite@latest` for a React + TypeScript setup):

- **Core Dependencies**: Install and verify the following in `package.json`:
  - Runtime: `react`, `react-dom`.
  - Development: `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`.
  - TypeScript: `typescript`.

- **Essential Development Dependencies**: Run the following command post-initialization to include Node.js type declarations:
  ```
  npm install --save-dev @types/node
  ```
  This provides type definitions for Node.js built-ins (e.g., `path`, `url`), preventing resolution errors in configuration files like `vite.config.ts`.

- **Verification Checklist**:
  - Confirm `npm install` succeeds without errors.
  - Review `package.json` scripts (e.g., `dev`, `build`, `lint`).

## React
- **Styling Practices**: Use themed CSS imports with inline comments explaining aesthetic choices. For cyberpunk themes, apply dark gray bases for backgrounds, black borders for structure, and green accents for interactive elements. Example:
  ```typescript
  import React from 'react';
  import './cyberpunk.css'; // Applies global cyberpunk theme: dark gray background, green text for cyberpunk aesthetic.

  interface MyComponentProps {
    label: string;
  }

  const MyComponent: React.FC<MyComponentProps> = ({ label }) => {
    const [state, setState] = React.useState('');
    return <div className="cyberpunk-panel">{label}: {state}</div>; // Class applies themed styles for enhanced UX.
  };

  export default MyComponent;

  ```

## TypeScript Configuration

TypeScript enforces type safety and code quality. Configurations must align with Vite's bundler mode for optimal performance.

- **Root `tsconfig.json`**: Use the composite project structure:
  ```json
  {
    "files": [],
    "references": [
      { "path": "./tsconfig.app.json" },
      { "path": "./tsconfig.node.json" }
    ]
  }
  ```

- **`tsconfig.app.json`** (for application code under `src/`):
  ```json
  {
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
      "target": "ES2022",
      "useDefineForClassFields": true,
      "lib": ["ES2022", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,

      /* Bundler mode */
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "verbatimModuleSyntax": true,
      "moduleDetection": "force",
      "noEmit": true,
      "jsx": "react-jsx",

      /* Linting */
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "erasableSyntaxOnly": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedSideEffectImports": true,

      /* Path mapping for aliases */
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      },
      "esModuleInterop": true
    },
    "include": ["src"]
  }
  ```

- **`tsconfig.node.json`** (for Node.js-specific files like `vite.config.ts`):
  ```json
  {
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
      "target": "ES2023",
      "lib": ["ES2023"],
      "module": "ESNext",
      "skipLibCheck": true,

      /* Bundler mode */
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "verbatimModuleSyntax": true,
      "moduleDetection": "force",
      "noEmit": true,

      /* Linting */
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "erasableSyntaxOnly": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedSideEffectImports": true
    },
    "include": ["vite.config.ts"]
  }
  ```
  

- **Handling Strict Options**:
  - Use type-only imports for interfaces/types: `import type { InterfaceName } from '@/path';` to comply with `verbatimModuleSyntax`.
  - For unused variables (e.g., React setters): Prefix with underscore, e.g., `const [_setState] = useState(...)`.

### TypeScript Best Practices
Always import external libraries (e.g., import axios from 'axios';) to avoid TS2304 errors, analogous to Java package imports.

## Import/Export Conventions

Promote modularity and avoid deep relative paths.

- **Preferred Style**: Use named exports for types and components: `export interface TabConfig { ... }`.
- **Avoid**: Default exports for types unless explicitly justified.
- **Path Resolution**: Leverage aliases: `import type { TabConfig } from '@/types/TabConfig';`.
- **Organization**: Group shared types in `src/types/`, components in `src/components/`, hooks in `src/hooks/`, and services in `src/services/`.

## Vite Configuration Best Practices

`vite.config.ts` must support aliases and React out-of-the-box.

- **Standard Template**:
  ```typescript
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import path from 'path';
  import { fileURLToPath } from 'url';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  });
  ```

- **Testing**: Validate aliases with early imports in components.

## Command Execution Standards

To ensure safe and reliable command execution, follow these guardrails:

### Timeout Protection
- **Default Timeout**: All Maven/shell commands use 2-minute timeouts by default to prevent indefinite hangs
- **Configurable**: Timeout can be adjusted per command when longer execution is expected
- **Purpose**: Prevents hanging processes and maintains responsive development workflow

### Single Execution Policy
- **No Auto-Retry**: Failing commands are not automatically re-executed
- **Investigation First**: Analyze failures through logs, code review, or output analysis before retrying
- **Targeted Fixes**: Propose specific fixes based on failure analysis

### Failure Analysis Approach
- **Exit Code 1 Handling**: Analyze command output thoroughly before any retry attempts
- **Root Cause Focus**: If tests/commands fail repeatedly, prioritize fixing underlying code/logic
- **Diagnostic Tools**: Use logs, debug output, and code inspection for failure diagnosis

### Command Restrictions
- **Server Startup**: Do not use `mvnw spring-boot:run` - request manual server startup in separate console/IDE
- **Purpose**: Prevents port conflicts and enables independent server management

## Verification and Testing Processes

Incorporate checks at milestones to catch issues proactively.

- **Periodic Build Review**: Run `npm run build` after configuration changes, before commits, and at each incremental stage end. Inspect for TypeScript errors (e.g., TS6133, TS1484) and resolve all.
- **Development Workflow**:
  1. `npm install` for dependencies.
  2. `npm run dev` for hot reloading.
  3. Browser console checks for runtime errors.
- **IDE Tips**: Restart TypeScript server post-config updates.

## Common Pitfalls and Resolutions

- **Export Mismatches**: Verify named exports match imports; use type-only for pure types.
- **Alias Discrepancies**: Ensure `tsconfig` paths mirror Vite `resolve.alias`.
- **Unused Declarations**: Use underscores for intentional omissions.
- **Node.js Types**: Always install `@types/node` to resolve built-in module errors.



## Development Environment Setup

### Git Configuration
Always ensure proper `.gitignore` configuration to prevent committing system files and build artifacts:

- **macOS Users**: `.DS_Store` files are automatically ignored
- **IDE Files**: `.vscode/`, `.idea/` directories are ignored
- **Build Artifacts**: `dist/`, `node_modules/`, `*.log` files are ignored
- **Environment Files**: `.env*` files are ignored for security

**Before initial commit**: Verify `.gitignore` exists and contains appropriate exclusions.

Review this document periodically as the project evolves. Non-compliance requires justification in pull requests.