import { http } from "@/api";
import type { SuccessResponse } from "@/types";
import type {
    CurrentUser,
    ForgotPasswordRequest,
    GoogleLoginRequest,
    LoginRequest,
    ResetPasswordRequest,
} from "../types";

export const authService = {
    login: async (payload: LoginRequest) => {
        const response = await http.post("/api/v1/auth/login", payload);
        return response.data;
    },
    loginWithGoogle: async (payload: GoogleLoginRequest) => {
        const response = await http.post("/api/v1/auth/google", payload);
        return response.data;
    },
    me: async (): Promise<SuccessResponse<CurrentUser>> => {
        const response = await http.get("/api/v1/auth/me");
        return response.data;
    },
    logout: async () => {
        await http.post("/api/v1/auth/logout");
    },
    forgotPassword: async (payload: ForgotPasswordRequest) => {
        const reseponse = await http.post("/api/v1/auth/forgot-password", payload);
        return reseponse.data;
    },
    resetPassword: async (payload: ResetPasswordRequest) => {
        const response = await http.post("/api/v1/auth/reset-password", payload);
        return response.data;
    },
};
