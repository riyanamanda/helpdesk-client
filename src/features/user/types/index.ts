export type UserRole = "ADMIN" | "EMPLOYEE";

export interface UserDivision {
    id: number;
    name: string;
}

export interface UserCreatedBy {
    id: string;
    name: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    google_id: string | null;
    avatar_url: string | null;
    phone: string | null;
    role: UserRole;
    division: UserDivision;
    is_active: boolean;
    created_by: UserCreatedBy | null;
    created_at: string;
    updated_at: string;
}

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    division_id: number;
}

export interface UserListParams {
    page?: number;
    limit?: number;
    search?: string;
    sort_by?: "name" | "email" | "role" | "division_id" | "is_active" | "created_at";
    sort_type?: "ASC" | "DESC";
    role?: UserRole;
    division_id?: number;
    is_active?: boolean;
}
