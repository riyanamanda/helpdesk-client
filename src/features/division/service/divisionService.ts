import { http } from "@/api";
import type { PaginatedResponse } from "@/types";
import type { Division, DivisionFormData, DivisionListParams, DivisionOptions } from "../types";

export const divisionService = {
    list: async (params?: DivisionListParams, signal?: AbortSignal) => {
        const response = await http.get("/api/v1/divisions", { params, signal });
        return response.data as PaginatedResponse<Division>;
    },

    get: async (id: number, signal?: AbortSignal) => {
        const response = await http.get(`/api/v1/divisions/${id}`, { signal });
        return response.data;
    },

    option: async (signal?: AbortSignal): Promise<{ data: DivisionOptions[] }> => {
        const response = await http.get("/api/v1/divisions/options", { signal });
        return response.data;
    },

    create: async (payload: Pick<DivisionFormData, "name">) => {
        const response = await http.post("/api/v1/divisions", payload);
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
