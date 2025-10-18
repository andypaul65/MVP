# MVP Documentation Index

This index provides an overview of all documentation for the MVP (Modular Visualization Platform) project, grouped by category. The MVP is a client-server framework designed as a backplane for building extensible applications, with React/TypeScript frontend and Spring Boot/Java backend.

**Last Updated**: 2025-10-18

## Categories

### Guidelines
Core standards and best practices for development on the MVP framework.

- **[Coding Standards](guidelines/coding-standards.md)**: Mandatory rules for code quality, TypeScript/Java practices, and pre-commit checks.
- **[Testing Guidelines](guidelines/testing-guidelines.md)**: Testing strategies including unit, integration, E2E, and BDD with Cucumber.
- **[Architecture](guidelines/architecture.md)**: High-level system design, modularity, and client-server patterns.
- **[Framework Patterns](guidelines/framework-patterns.md)**: Design patterns, extension mechanisms, and debugging support.
- **[Expansion Guide](guidelines/expansion-guide.md)**: How to extend the MVP framework with registries and hooks.

### Design Documents
Detailed design specifications and UI/UX specs.

- **[MVP UI Design Specification](MVPUIDesignSpecification.md)**: Overview of the tabbed interface, namespaces, and cyberpunk theme.

### Subproject Resources
Tailored guidelines for building subprojects on the MVP backplane.

- **[Subproject Integration Guide](subprojects/subproject-integration-guide.md)**: Step-by-step setup for pulling and using MVP deployables.
- **[Subproject Coding Standards](subprojects/subproject-coding-standards.md)**: Adapted coding standards for subproject development.
- **[Subproject Testing Guidelines](subprojects/subproject-testing-guidelines.md)**: Testing practices with backend isolation and CI recommendations.
- **[Subproject Architecture](subprojects/subproject-architecture.md)**: Architecture guidelines for extending the backplane.
- **[Subproject Framework Patterns](subprojects/subproject-framework-patterns.md)**: Patterns for subproject extensions.
- **[Subproject Expansion Guide](subprojects/subproject-expansion-guide.md)**: Expansion strategies specific to subprojects.

### How-To Guides
Manual setup and configuration instructions.

- **[Obtaining and Setting Up Passcodes](howto/obtaining-and-setting-up-passcodes.md)**: Guide for GitHub PAT and NPM token setup for publishing.

### BDD (Behavior-Driven Development)
Feature files and test scenarios (located in `docs/BDD/` if present).

*Note: BDD documentation may be integrated into testing guidelines or separate feature files.*

## Quick Start
1. Review [Coding Standards](guidelines/coding-standards.md) for mandatory practices.
2. For new subprojects, start with [Subproject Integration Guide](subprojects/subproject-integration-guide.md).
3. Set up authentication via [Obtaining and Setting Up Passcodes](howto/obtaining-and-setting-up-passcodes.md).
4. Deploy using [Expansion Guide](guidelines/expansion-guide.md).

## See Also
- [GitHub Repository](https://github.com/andypaul65/MVP): Source code and issues.
- [NPM Package](https://www.npmjs.com/package/@nednederlander/mvp-client): Client library.
- [GitHub Packages](https://github.com/andypaul65/MVP/packages): Server JAR.