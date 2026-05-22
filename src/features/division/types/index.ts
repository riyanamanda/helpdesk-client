export interface Division {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DivisionFormData {
    name: string;
    is_active: boolean;
}
