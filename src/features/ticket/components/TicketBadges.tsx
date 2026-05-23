import { Badge } from "@/components/ui/badge";
import type { TicketPriority, TicketStatus } from "../types";

const STATUS_CONFIG: Record<
    TicketStatus,
    { label: string; variant: "default" | "secondary" | "outline" | "success" | "destructive" }
> = {
    OPEN: { label: "Open", variant: "outline" },
    IN_PROGRESS: { label: "In Progress", variant: "secondary" },
    RESOLVED: { label: "Resolved", variant: "success" },
    CLOSED: { label: "Closed", variant: "destructive" },
};

const PRIORITY_CONFIG: Record<
    TicketPriority,
    { label: string; variant: "default" | "secondary" | "outline" | "success" | "destructive" }
> = {
    LOW: { label: "Low", variant: "outline" },
    MEDIUM: { label: "Medium", variant: "secondary" },
    HIGH: { label: "High", variant: "default" },
    URGENT: { label: "Urgent", variant: "destructive" },
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
    const config = STATUS_CONFIG[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function TicketPriorityBadge({ priority }: { priority: TicketPriority | null }) {
    if (!priority) return <span className="text-muted-foreground">—</span>;
    const config = PRIORITY_CONFIG[priority];
    return <Badge variant={config.variant}>{config.label}</Badge>;
}
