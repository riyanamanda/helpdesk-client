import { http } from "@/api";
import type { PaginatedResponse } from "@/types";
import type { Division, DivisionFormData } from "../types";

export const divisionService = {
    list: async (params?: { page?: number; limit?: number }) => {
        const response = await http.get("/api/v1/divisions", { params });
        return response.data as PaginatedResponse<Division>;
    },

    create: async (payload: Pick<DivisionFormData, "name">) => {
        const response = await http.post("/api/v1/divisions", payload);
        return response.data;
    },

    get: async (id: number) => {
        const response = await http.get(`/api/v1/divisions/${id}`);
        return response.data;
    },

    update: async (id: number, payload: Partial<DivisionFormData>) => {
        const response = await http.patch(`/api/v1/divisions/${id}`, payload);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await http.delete(`/api/v1/divisions/${id}`);
        return response.data;
    },
};
