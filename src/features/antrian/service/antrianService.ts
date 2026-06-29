import { http } from "@/api";
import type { PaginatedResponse } from "@/types";
import type { Antrian, AntrianListParams } from "../types";

export const antrianService = {
    list: async (params?: AntrianListParams, signal?: AbortSignal) => {
        const response = await http.get("/api/v1/antrian", { params, signal });
        return response.data as PaginatedResponse<Antrian>;
    },

    checkIn: async (kodeBooking: number, signal?: AbortSignal) => {
        await http.post(`/api/v1/antrian/${kodeBooking}/checkin`, { signal });
    },
};
