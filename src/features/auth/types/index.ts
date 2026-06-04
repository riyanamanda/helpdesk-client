import type { UserGender } from "@/features/user/types";

export interface CurrentUser {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "EMPLOYEE";
    avatar_url: string | null;
    division: {
        id: number;
        name: string;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface GoogleLoginRequest {
    id_token: string;
}

export interface UpdateProfileRequest {
    name: string;
    email: string;
    phone?: string | null;
    gender: UserGender;
}

export interface UpdatePasswordRequest {
    current_password: string;
    new_password: string;
}
