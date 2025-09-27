import { http, HttpResponse } from 'msw';
import type { MessageDto } from '@/types/MessageDto';
import type { HeartbeatDto } from '@/types/HeartbeatDto';

// Type for path parameters (namespace extraction)
type GetStateParams = {
    namespace: string;
};

export const handlers = [
    http.get<GetStateParams, never, MessageDto>(
        'http://localhost:8080/api/state/:namespace',
        async ({ params }) => {
            const { namespace } = params;
            return HttpResponse.json({
                content: `Mock state for ${namespace}`,
                namespace: namespace,
            });
        },
    ),
    http.post<MessageDto, never, MessageDto>(
        'http://localhost:8080/api/message/:namespace',
        async ({ params, request }) => {
            const { namespace } = params;
            const message: MessageDto = await request.json();
            return HttpResponse.json({
                content: `Echo: ${message.content}`,
                namespace: namespace,
            });
        },
    ),
    http.get<never, never, HeartbeatDto>(
        'http://localhost:8080/api/heartbeat',
        async () => {
            return HttpResponse.json({
                status: 'alive',
                timestamp: new Date().toISOString(),
            });
        },
    ),
    http.post('http://localhost:8080/auth/login', async ({ request }) => {
        const body = await request.json() as { username: string; password: string };
        if (body.username === 'user@example.com' && body.password === '656frfRRf') {
            return HttpResponse.json({
                token: 'mock-jwt-token',
                user: { id: 1, username: 'user@example.com', name: 'Demo User' }
            });
        } else {
            return new HttpResponse(null, { status: 401 });
        }
    }),
    http.post('http://localhost:8080/auth/logout', () => {
        return HttpResponse.json({});
    }),
    http.get('http://localhost:8080/auth/me', ({ request }) => {
        const auth = request.headers.get('Authorization');
        if (auth === 'Bearer mock-jwt-token') {
            return HttpResponse.json({ id: 1, username: 'user@example.com', name: 'Demo User' });
        } else {
            return new HttpResponse(null, { status: 401 });
        }
    }),
];