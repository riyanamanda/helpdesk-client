export interface TicketStatusStats {
    open: number;
    in_progress: number;
    resolved: number;
    closed: number;
    total: number;
    unassigned: number;
    stale: number;
}

export interface TicketPriorityStats {
    low: number;
    medium: number;
    high: number;
    urgent: number;
}

export interface DashboardSummary {
    status: TicketStatusStats;
    priority: TicketPriorityStats;
}

export interface MonthlyTicketTrend {
    month: number;
    submitted: number;
    resolved: number;
    closed: number;
}

export interface AgentWorkload {
    agent_id: string;
    agent_name: string;
    in_progress: number;
    resolved: number;
}

export interface CategoryTickets {
    category_id: number;
    category_name: string;
    total: number;
}
