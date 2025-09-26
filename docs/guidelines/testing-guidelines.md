# Testing Guidelines for MVP Framework

## Overview
Testing serves as executable documentation and is developed iteratively alongside specifications. Aim for 80%+ code coverage across unit, integration, and end-to-end tests. Use fixtures for consistent example data and incorporate assertions for UX themes (e.g., color matches for cyberpunk styling).

## Unit Testing
- **Client-Side**: Use Vitest + React Testing Library for isolated component tests. Vitest is preferred over Jest for seamless integration with Vite, reducing configuration issues. Assert functionality, state changes, and themed styling (e.g., green accents via class name or style checks). Example: Test tab rendering and color application in `TabbedInterface.tsx`.
  - Configuration Tips: In `vite.config.ts`, add a `test` section with `environment: 'jsdom'`, `setupFiles: './src/setupTests.ts'`, `globals: true`, and `css: false` to handle CSS imports. Mock CSS files in tests if needed (e.g., `vi.mock('../cyberpunk.css', () => ({}))`).
  - Common Pitfalls: Ensure path aliases (e.g., `@/*`) are mapped correctly; use `vi.fn()` for mocks instead of Jest equivalents.
    - Example Snippet (Vitest for Themed Component):
    ```tsx
    import { render, screen } from '@testing-library/react';
    import { describe, it, expect } from 'vitest';
    import TabbedInterface from '../TabbedInterface';

    describe('TabbedInterface', () => {
      it('applies cyberpunk theme to active tab', () => {
        const tabs = [{ namespace: 'test', title: 'Test', component: () => <div>Test Content</div> }];
        render(<TabbedInterface tabs={tabs} />);
        const content = screen.getByText('Test Content').closest('.cyberpunk-content');
        expect(content).toHaveStyle('background-color: rgb(30, 30, 30)'); // Dark gray #1E1E1E
      });
    });
    ```
    - Example Snippet (Vitest for Hook - useSystemState):
    ```tsx
    import { describe, it, expect, vi } from 'vitest';
    import { renderHook, act, waitFor } from '@testing-library/react';
    import { useSystemState } from '../useSystemState';
    import { apiService } from '@/services/apiService';

    vi.mock('@/services/apiService');

    describe('useSystemState', () => {
      it('should load state on mount', async () => {
        (apiService.getState as any).mockResolvedValue({ content: 'Loaded', namespace: 'test' });

        const { result } = renderHook(() => useSystemState('test'));

        await waitFor(() => {
          expect(result.current.loading).toBe(false);
        });

        expect(result.current.state).toBe('Loaded');
      });
    });
    ```
    - Example Snippet (Vitest for Service - apiService):
    ```tsx
    import { describe, it, expect, vi } from 'vitest';
    import { apiService } from '../apiService';
    import { server } from '../../setupTests';
    import { http, HttpResponse } from 'msw';

    describe('apiService', () => {
      it('should return MessageDto on successful fetch', async () => {
        server.use(
          http.get('http://localhost:8080/api/state/test', () => {
            return HttpResponse.json({ content: 'Test', namespace: 'test' });
          })
        );

        const result = await apiService.getState('test');
        expect(result.content).toBe('Test');
      });
    });
    ```
- **Server-Side**: Employ JUnit + Mockito for mocking dependencies and testing services/controllers in isolation.
  - Example Snippet (JUnit for Service):
    ```java
    @ExtendWith(MockitoExtension.class)
    class SystemStateServiceTest {
      @Mock private MessageRepository repository;
      @InjectMocks private SystemStateService service;

      @Test
      void getStateReturnsDto() {
        MessageDto dto = new MessageDto("Test");
        when(repository.findByNamespace("test")).thenReturn(Optional.of(dto));
        assertEquals(dto, service.getState("test"));
      }
    }
    ```

## Integration Testing
**Integration Guidance**: Start with a simple polling mechanism on client (setInterval for fetches, like Java's TimerTask), evolving to WebSockets for real-time, analogous to Java's asynchronous messaging with JMS.

- **Client-Side**: Use MSW for API mocking in both development mode (automatic interception) and testing (explicit server setup), simulating server responses to verify data flow and rendering.
  - Example Snippet (MSW for API Mock):
    ```ts
    import { rest } from 'msw';
    import { setupServer } from 'msw/node';

    const server = setupServer(
      rest.get('/api/state/:namespace', (req, res, ctx) => {
        return res(ctx.json({ state: 'active' }));
      })
    );
    ```
- **Server-Side**: Use @SpringBootTest for full context loading and endpoint verification.
  - Example Snippet (@SpringBootTest):
    ```java
    @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
    class MvpControllerIntegrationTest {
      @Autowired private TestRestTemplate restTemplate;

      @Test
      void getStateReturns200() {
        ResponseEntity<MessageDto> response = restTemplate.getForEntity("/api/state/test", MessageDto.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
      }
    }
    ```
- Include style assertions for cyberpunk theme consistency (e.g., dark gray backgrounds, green highlights).



## End-to-End Testing
Use Cypress for end-to-end testing, mirroring Java's integration tests with Spring Boot Test.
- Use Cypress for full-stack scenarios, including tab navigation, real-time updates, and visual regression for UX themes.
  - Example Snippet (Cypress for Tab Switch):
    ```js
    describe('Tabbed Interface', () => {
      it('switches tabs and verifies theme', () => {
        cy.visit('/');
        cy.get('.cyberpunk-tabs button').first().click();
        cy.get('.cyberpunk-content').should('have.css', 'background-color', 'rgb(30, 30, 30)');
      });
    });
    ```

## Best Practices
- Develop tests iteratively with code implementation.
- Run tests frequently to maintain coverage.
- For visual themes, consider snapshot testing or libraries like Percy for regression detection.
- Address common setup errors early, such as incompatible testing environments, to streamline development.
- Prioritize minimal changes; verify with npm run build and server runs.
```