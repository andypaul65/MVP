import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import type { MessageDto } from '@/types/MessageDto';

// Mock API server for integration tests
// Simulate server state storage
const mockStateStore: Map<string, MessageDto> = new Map();

export const server = setupServer(
  http.get('http://localhost:8080/api/state/:namespace', ({ params }) => {
    const namespace = params.namespace as string;
    const stored = mockStateStore.get(namespace);
    if (stored) {
      return HttpResponse.json(stored);
    }
    return HttpResponse.json({
      content: `Active state for ${namespace}`,
      namespace: namespace,
    });
  }),
  http.post('http://localhost:8080/api/message/:namespace', async ({ request, params }) => {
    const namespace = params.namespace as string;
    const body = await request.json() as MessageDto;
    const reversed = body.content.split('').reverse().join('');
    const processedMessage: MessageDto = {
      content: reversed,
      namespace: namespace,
    };
    mockStateStore.set(namespace, processedMessage);
    return HttpResponse.json(processedMessage);
  }),
  http.get('http://localhost:8080/api/heartbeat', () => {
    return HttpResponse.json({
      status: 'alive',
      timestamp: new Date().toISOString(),
    });
  }),
  // Handle SockJS info requests for WebSocket testing
  http.get('http://localhost:8080/ws/info', () => {
    return HttpResponse.json({
      entropy: Math.random(),
      origins: ['*:*'],
      cookie_needed: false,
      websocket: true,
    });
  })
);

// Start server before tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers and state store after each test
afterEach(() => {
  server.resetHandlers();
  mockStateStore.clear();
});

// Close server after tests
afterAll(() => server.close());