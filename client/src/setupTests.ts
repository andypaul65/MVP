import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Mock API server for integration tests
export const server = setupServer(
  http.get('/api/state/:namespace', ({ params }) => {
    const namespace = params.namespace as string;
    return HttpResponse.json({
      state: `Active state for ${namespace}`,
      messages: [`Message 1 for ${namespace}`, `Message 2 for ${namespace}`],
    });
  }),
  http.post('/api/message/:namespace', () => {
    return new HttpResponse(null, { status: 200 });
  })
);

// Start server before tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close server after tests
afterAll(() => server.close());