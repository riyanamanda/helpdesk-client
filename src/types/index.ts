export interface Pagination {
    page: number;
    limit: number;
    total: number;
    total_page: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: Pagination;
}

export interface SuccessResponse<T> {
    data: T;
}

export interface ValidationFieldError {
    code: string;
    param?: string;
}

export interface ServerErrorResponse {
    error: {
        code?: string;
        details?: Record<string, ValidationFieldError>;
    };
}
