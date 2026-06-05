export interface TicketStatusStats {
    open: number;
    in_progress: number;
    resolved: number;
    closed: number;
    total: number;
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

export interface RecentTicket {
    id: number;
    title: string;
    status: string;
    priority: string | null;
    created_by: string;
    assigned_to: string | null;
    created_at: string;
}

export interface MonthlyTicketTrend {
    month: number;
    submitted: number;
    resolved: number;
    closed: number;
}
