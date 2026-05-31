export interface Category {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CategoryOption {
    id: number;
    name: string;
}

export interface CategoryFormData {
    name: string;
    is_active: boolean;
}

export interface CategoryListParams {
    page?: number;
    limit?: number;
    search?: string;
    sort_by?: "name" | "is_active" | "created_at";
    sort_type?: "ASC" | "DESC";
    is_active?: boolean;
}
