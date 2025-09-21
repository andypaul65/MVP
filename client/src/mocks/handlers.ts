import { http, HttpResponse } from 'msw';

// Type for path parameters (namespace extraction)
type GetStateParams = {
    namespace: string;
};

// Type for response body (aligns with expected DTO structure)
type GetStateResponse = {
    state: string;
    messages: Array<{ id: number; content: string }>;
};

export const handlers = [
    http.get<GetStateParams, never, GetStateResponse>(
        '/api/state/:namespace',
        async ({ params }) => {
            const { namespace } = params;
            return HttpResponse.json({
                state: 'available',
                messages: [{ id: 1, content: `Mock message for ${namespace}` }],
            });
        },
    ),
];