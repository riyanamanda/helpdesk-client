export interface LoginRequest {
    email: string;
    password: string;
}

export interface GoogleLoginRequest {
    id_token: string;
}

export interface LoginResponse {
    access_token: string;
}
