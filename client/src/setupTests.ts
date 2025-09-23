import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Mock API server for integration tests
export const server = setupServer(
  http.get('http://localhost:8080/api/state/:namespace', ({ params }) => {
    const namespace = params.namespace as string;
    return HttpResponse.json({
      content: `Active state for ${namespace}`,
      namespace: namespace,
    });
  }),
  http.post('http://localhost:8080/api/message/:namespace', ({ request }) => {
    // For simplicity, return the sent message as response
    return request.json().then(body => HttpResponse.json(body));
  }),
  http.get('http://localhost:8080/api/heartbeat', () => {
    return HttpResponse.json({
      status: 'alive',
      timestamp: new Date().toISOString(),
    });
  })
);

// Start server before tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close server after tests
afterAll(() => server.close());