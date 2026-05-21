import { http } from "@/api";

export const categoryService = {
    list: async () => {
        const response = await http.get("/api/v1/categories");
        return response.data;
    },
};
