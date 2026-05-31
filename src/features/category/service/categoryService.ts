import { http } from "@/api";
import type { PaginatedResponse } from "@/types";
import type { Category, CategoryFormData, CategoryListParams, CategoryOption } from "../types";

export const categoryService = {
    list: async (params?: CategoryListParams) => {
        const response = await http.get("/api/v1/categories", { params });
        return response.data as PaginatedResponse<Category>;
    },

    options: async (): Promise<{ data: CategoryOption[] }> => {
        const response = await http.get("/api/v1/categories/options");
        return response.data;
    },

    create: async (payload: Pick<CategoryFormData, "name">) => {
        const response = await http.post("/api/v1/categories", payload);
        return response.data;
    },

    get: async (id: number) => {
        const response = await http.get(`/api/v1/categories/${id}`);
        return response.data;
    },

    update: async (id: number, payload: Partial<CategoryFormData>) => {
        const response = await http.patch(`/api/v1/categories/${id}`, payload);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await http.delete(`/api/v1/categories/${id}`);
        return response.data;
    },
};
