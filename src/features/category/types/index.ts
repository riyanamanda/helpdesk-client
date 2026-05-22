export interface Category {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateCategoryRequest {
    name: string;
}

export interface UpdateCategoryRequest {
    id: string
    name: string;
    is_active: boolean;
}
