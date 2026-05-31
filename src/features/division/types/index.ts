export interface Division {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DivisionOptions {
    id: number;
    name: string;
}

export interface DivisionFormData {
    name: string;
    is_active: boolean;
}

export interface DivisionListParams {
    page?: number;
    limit?: number;
    search?: string;
    sort_by?: "name" | "is_active" | "created_at";
    sort_type?: "ASC" | "DESC";
    is_active?: boolean;
}
