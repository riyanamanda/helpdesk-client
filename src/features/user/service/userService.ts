import { http } from "@/api";
import type { PaginatedResponse } from "@/types";
import type { User, UserBrief, UserFormData, UserListParams } from "../types";

export const userService = {
    list: async (params?: UserListParams, signal?: AbortSignal) => {
        const response = await http.get("/api/v1/users", { params, signal });
        return response.data as PaginatedResponse<User>;
    },

    listAssignableUser: async (signal?: AbortSignal): Promise<{ data: UserBrief[] }> => {
        const response = await http.get("/api/v1/users/assignable", { signal });
        return response.data;
    },

    get: async (id: string, signal: AbortSignal) => {
        const response = await http.get(`/api/v1/users/${id}`, { signal });
        return response.data;
    },

    create: async (payload: UserFormData) => {
        const response = await http.post("/api/v1/users", payload);
        return response.data;
    },

    update: async (id: string, payload: Omit<UserFormData, "password">) => {
        const response = await http.patch(`/api/v1/users/${id}`, payload);
        return response.data;
    },

    updatePassword: async (id: string, password: string) => {
        const response = await http.patch(`/api/v1/users/${id}/password`, { password });
        return response.data;
    },
};
