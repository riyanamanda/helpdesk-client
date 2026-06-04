import { http } from "@/api";
import type { PaginatedResponse, SuccessResponse } from "@/types";
import type {
    Feedback,
    FeedbackCreateFormData,
    FeedbackListParams,
    FeedbackUpdateStatusFormData,
} from "../types";

export const feedbackService = {
    list: async (params?: FeedbackListParams) => {
        const response = await http.get("/api/v1/feedbacks", { params });
        return response.data as PaginatedResponse<Feedback>;
    },

    adminList: async (params?: FeedbackListParams) => {
        const response = await http.get("/api/v1/admin/feedbacks", { params });
        return response.data as PaginatedResponse<Feedback>;
    },

    get: async (id: number) => {
        const response = await http.get(`/api/v1/feedbacks/${id}`);
        return response.data as SuccessResponse<Feedback>;
    },

    create: async (payload: FeedbackCreateFormData) => {
        const response = await http.post("/api/v1/feedbacks", payload);
        return response.data;
    },

    updateStatus: async (id: number, payload: FeedbackUpdateStatusFormData) => {
        const response = await http.patch(`/api/v1/feedbacks/${id}/status`, payload);
        return response.data;
    },
};
