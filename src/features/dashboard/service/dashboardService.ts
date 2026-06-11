import { http } from "@/api";
import type {
    AgentWorkload,
    CategoryTickets,
    DashboardSummary,
    MonthlyTicketTrend,
    RecentTicket,
} from "../types";

export const dashboardService = {
    getSummary: async () => {
        const response = await http.get("/api/v1/dashboard/summary");
        return response.data as { data: DashboardSummary };
    },

    getRecentTickets: async () => {
        const response = await http.get("/api/v1/dashboard/recent-tickets");
        return response.data as { data: RecentTicket[] };
    },

    getMonthlyTrend: async (year: number) => {
        const response = await http.get("/api/v1/dashboard/monthly-trend", { params: { year } });
        return response.data as { data: MonthlyTicketTrend[] };
    },

    getAgentWorkload: async () => {
        const response = await http.get("/api/v1/dashboard/agent-workload");
        return response.data as { data: AgentWorkload[] };
    },

    getTicketsByCategory: async () => {
        const response = await http.get("/api/v1/dashboard/tickets-by-category");
        return response.data as { data: CategoryTickets[] };
    },
};
