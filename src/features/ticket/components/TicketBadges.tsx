import { Badge } from "@/components/ui/badge";
import type { TicketPriority, TicketStatus } from "../types";

const STATUS_CONFIG: Record<TicketStatus, { label: string; className: string }> = {
    OPEN: {
        label: "Open",
        className: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    },
    IN_PROGRESS: {
        label: "In Progress",
        className: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
    },
    RESOLVED: {
        label: "Resolved",
        className: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    },
    CLOSED: {
        label: "Closed",
        className: "bg-secondary text-secondary-foreground",
    },
};

const PRIORITY_CONFIG: Record<TicketPriority, { label: string; className: string }> = {
    LOW: {
        label: "Low",
        className: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    },
    MEDIUM: {
        label: "Medium",
        className: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
    },
    HIGH: {
        label: "High",
        className: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
    },
    URGENT: {
        label: "Urgent",
        className:
            "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:focus-visible:ring-destructive/40",
    },
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
    const config = STATUS_CONFIG[status];
    return <Badge className={config.className}>{config.label}</Badge>;
}

export function TicketPriorityBadge({ priority }: { priority: TicketPriority | null }) {
    if (!priority) return <span className="text-muted-foreground">—</span>;
    const config = PRIORITY_CONFIG[priority];
    return <Badge className={config.className}>{config.label}</Badge>;
}
