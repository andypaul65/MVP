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
];