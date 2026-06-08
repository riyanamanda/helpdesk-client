import { http } from "@/api";
import type { Notification } from "../types";

export const notificationService = {
    list: async () => {
        const response = await http.get("/api/v1/notifications");
        return response.data as { data: Notification[] };
    },

    unreadCount: async () => {
        const response = await http.get("/api/v1/notifications/unread-count");
        return response.data as { data: { count: number } };
    },

    markAsRead: async (id: number) => {
        await http.patch(`/api/v1/notifications/${id}/read`);
    },

    markAllAsRead: async () => {
        await http.patch("/api/v1/notifications/read-all");
    },
};
