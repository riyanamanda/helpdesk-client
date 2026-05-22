import { http } from "@/api";
import type { CreateCategoryRequest, UpdateCategoryRequest } from "../types";

export const categoryService = {
    list: async () => {
        const response = await http.get("/api/v1/categories");
        return response.data;
    },

    create: async (payload: CreateCategoryRequest) => {
        const response = await http.post("/api/v1/categories", payload);
        return response.data;
    },

    update: async (payload: UpdateCategoryRequest) => {
        const response = await http.patch(
            `/api/v1/categories/${payload.id}`,
            payload
        );
        return response.data;
    },
};
