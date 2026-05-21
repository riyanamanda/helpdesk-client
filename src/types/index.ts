interface Meta {
    timestamp: string;
    request_id: string;
}

export interface ServerErrorResponse {
    error: {
        code?: string;
        message?: string;
        details?: Record<string, string | string[]>;
    };
    meta: Pick<Meta, "request_id" | "timestamp">;
}
