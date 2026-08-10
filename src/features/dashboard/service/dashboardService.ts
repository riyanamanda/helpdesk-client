import { http } from "@/api";
import type {
    AgentWorkload,
    CategoryTickets,
    DashboardSummary,
    MonthlyTicketTrend,
} from "../types";

export const dashboardService = {
    getSummary: async (signal: AbortSignal) => {
        const response = await http.get("/api/v1/dashboard/summary", { signal });
        return response.data as { data: DashboardSummary };
    },

    getMonthlyTrend: async (year: number, signal: AbortSignal) => {
        const response = await http.get("/api/v1/dashboard/monthly-trend", {
            params: { year },
            signal,
        });
        return response.data as { data: MonthlyTicketTrend[] };
    },

    getAgentWorkload: async (signal: AbortSignal) => {
        const response = await http.get("/api/v1/dashboard/agent-workload", { signal });
        return response.data as { data: AgentWorkload[] };
    },

    getTicketsByCategory: async (signal: AbortSignal) => {
        const response = await http.get("/api/v1/dashboard/tickets-by-category", { signal });
        return response.data as { data: CategoryTickets[] };
    },
};
