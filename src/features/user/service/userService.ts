import { http } from "@/api";
import type { PaginatedResponse } from "@/types";
import type {
    AssignableUser,
    UpdateUserFormData,
    User,
    UserFormData,
    UserListParams,
} from "../types";

export const userService = {
    list: async (params?: UserListParams) => {
        const response = await http.get("/api/v1/users", { params });
        return response.data as PaginatedResponse<User>;
    },

    listAssignableUser: async (): Promise<{ data: AssignableUser[] }> => {
        const response = await http.get("/api/v1/users/assignable");
        return response.data;
    },

    get: async (id: string) => {
        const response = await http.get(`/api/v1/users/${id}`);
        return response.data;
    },

    create: async (payload: UserFormData) => {
        const response = await http.post("/api/v1/users", payload);
        return response.data;
    },

    update: async (id: string, payload: UpdateUserFormData) => {
        const response = await http.patch(`/api/v1/users/${id}`, payload);
        return response.data;
    },

    updatePassword: async (id: string, password: string) => {
        const response = await http.patch(`/api/v1/users/${id}/password`, { password });
        return response.data;
    },
};
