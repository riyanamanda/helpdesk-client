import { http } from "@/api";
import type { PaginatedResponse } from "@/types";
import type {
    Ticket,
    TicketAssignFormData,
    TicketCreateFormData,
    TicketDetail,
    TicketListParams,
    TicketPriorityFormData,
    TicketResolutionFormData,
} from "../types";

export const ticketService = {
    list: async (params?: TicketListParams) => {
        const response = await http.get("/api/v1/tickets", { params });
        return response.data as PaginatedResponse<Ticket>;
    },

    get: async (id: number) => {
        const response = await http.get(`/api/v1/tickets/${id}`);
        return response.data as { data: TicketDetail };
    },

    create: async (data: TicketCreateFormData, file?: File) => {
        if (!file) {
            const response = await http.post("/api/v1/tickets", data);
            return response.data;
        }
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", String(data.category));
        formData.append("division", String(data.division));
        formData.append("attachment", file);
        const response = await http.post("/api/v1/tickets", formData);
        return response.data;
    },

    assign: async (id: number, payload: TicketAssignFormData) => {
        const response = await http.patch(`/api/v1/tickets/${id}/assign`, payload);
        return response.data;
    },

    setPriority: async (id: number, payload: TicketPriorityFormData) => {
        const response = await http.patch(`/api/v1/tickets/${id}/priority`, payload);
        return response.data;
    },

    resolve: async (id: number, data: TicketResolutionFormData, file?: File) => {
        if (!file) {
            const response = await http.patch(`/api/v1/tickets/${id}/resolution`, data);
            return response.data;
        }
        const formData = new FormData();
        formData.append("resolution", data.resolution);
        formData.append("attachment", file);
        const response = await http.patch(`/api/v1/tickets/${id}/resolution`, formData);
        return response.data;
    },

    close: async (id: number) => {
        const response = await http.patch(`/api/v1/tickets/${id}/close`);
        return response.data;
    },
};
