// DTO for heartbeat response, aligned with api-contracts.json
export interface HeartbeatDto {
    status: string; // Server status, e.g., "alive"
    timestamp: string; // ISO timestamp of the response
}