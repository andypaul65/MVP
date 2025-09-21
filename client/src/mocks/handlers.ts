import { http, HttpResponse } from 'msw';

// Type for path parameters (namespace extraction)
type GetStateParams = {
    namespace: string;
};

// Type for response body (aligns with expected DTO structure; updated for string messages)
type GetStateResponse = {
    state: string;
    messages: string[]; // Changed from Array<{ id: number; content: string }> to string[]
};

export const handlers = [
    http.get<GetStateParams, never, GetStateResponse>(
        '/api/state/:namespace',
        async ({ params }) => {
            const { namespace } = params;
            return HttpResponse.json({
                state: 'available',
                messages: [`Mock message for ${namespace}`], // Array of strings, not objects
            });
        },
    ),
];