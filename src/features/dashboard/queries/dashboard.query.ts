import { queryOptions } from "@tanstack/react-query";
import { dashboardService } from "../service/dashboardService";
import { DASHBOARD_QUERY_KEYS } from "./queryKeys";

export { DASHBOARD_QUERY_KEYS };

export function dashboardSummaryQueryOption() {
    return queryOptions({
        queryKey: DASHBOARD_QUERY_KEYS.SUMMARY,
        queryFn: () => dashboardService.getSummary(),
    });
}

export function dashboardRecentTicketsQueryOption() {
    return queryOptions({
        queryKey: DASHBOARD_QUERY_KEYS.RECENT_TICKETS,
        queryFn: () => dashboardService.getRecentTickets(),
    });
}

export function dashboardMonthlyTrendQueryOption(year: number) {
    return queryOptions({
        queryKey: DASHBOARD_QUERY_KEYS.MONTHLY_TREND(year),
        queryFn: () => dashboardService.getMonthlyTrend(year),
    });
}

export function dashboardAgentWorkloadQueryOption() {
    return queryOptions({
        queryKey: DASHBOARD_QUERY_KEYS.AGENT_WORKLOAD,
        queryFn: () => dashboardService.getAgentWorkload(),
    });
}
