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
    by_status: TicketStatusStats;
    by_priority: TicketPriorityStats;
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
