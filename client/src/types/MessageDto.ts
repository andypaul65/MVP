// DTO for messages, aligned with api-contracts.json schema for type safety
export interface MessageDto {
    content: string; // The message content to be exchanged or rendered
    namespace: string; // The namespace for scoping the message
}