interface Meta {
    timestamp: string;
    request_id: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    total_page: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: Meta & { pagination: Pagination };
}

export interface ServerErrorResponse {
    error: {
        code?: string;
        message?: string;
        details?: Record<string, string | string[]>;
    };
    meta: Pick<Meta, "request_id" | "timestamp">;
}
