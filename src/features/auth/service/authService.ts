import { http } from "@/api";
import type { GoogleLoginRequest, LoginRequest } from "../types";

export const authService = {
    login: async (payload: LoginRequest) => {
        const response = await http.post("/api/v1/auth/login", payload);
        return response.data;
    },
    loginWithGoogle: async (payload: GoogleLoginRequest) => {
        const response = await http.post("/api/v1/auth/google", payload);
        return response.data;
    },
    me: async () => {
        const response = await http.get("/api/v1/auth/me");
        return response.data;
    },
};
