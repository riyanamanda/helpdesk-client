const DASHBOARD_ROOT_KEY = ["dashboard"] as const;

export const DASHBOARD_QUERY_KEYS = {
    ROOT: DASHBOARD_ROOT_KEY,
    SUMMARY: [...DASHBOARD_ROOT_KEY, "summary"] as const,
    RECENT_TICKETS: [...DASHBOARD_ROOT_KEY, "recent-tickets"] as const,
    MONTHLY_TREND: (year: number) => [...DASHBOARD_ROOT_KEY, "monthly-trend", year] as const,
    AGENT_WORKLOAD: [...DASHBOARD_ROOT_KEY, "agent-workload"] as const,
    TICKETS_BY_CATEGORY: [...DASHBOARD_ROOT_KEY, "tickets-by-category"] as const,
};
