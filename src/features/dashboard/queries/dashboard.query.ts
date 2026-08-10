import { queryOptions } from "@tanstack/react-query";
import { dashboardService } from "../service/dashboardService";
import { DASHBOARD_QUERY_KEYS } from "./queryKeys";

export { DASHBOARD_QUERY_KEYS };

export function dashboardSummaryQueryOption() {
    return queryOptions({
        queryKey: DASHBOARD_QUERY_KEYS.SUMMARY,
        queryFn: ({ signal }) => dashboardService.getSummary(signal),
    });
}

export function dashboardMonthlyTrendQueryOption(year: number) {
    return queryOptions({
        queryKey: DASHBOARD_QUERY_KEYS.MONTHLY_TREND(year),
        queryFn: ({ signal }) => dashboardService.getMonthlyTrend(year, signal),
    });
}

export function dashboardAgentWorkloadQueryOption() {
    return queryOptions({
        queryKey: DASHBOARD_QUERY_KEYS.AGENT_WORKLOAD,
        queryFn: ({ signal }) => dashboardService.getAgentWorkload(signal),
    });
}

export function dashboardTicketsByCategoryQueryOption() {
    return queryOptions({
        queryKey: DASHBOARD_QUERY_KEYS.TICKETS_BY_CATEGORY,
        queryFn: ({ signal }) => dashboardService.getTicketsByCategory(signal),
    });
}
