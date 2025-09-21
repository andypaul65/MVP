// DTO for messages, supporting themed client displays as per MVPUIDesignSpecification.md
export interface MessageDto {
    content: string; // Core message text; extensible for id, timestamp, etc.
}