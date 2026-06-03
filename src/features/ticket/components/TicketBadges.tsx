import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import type { TicketPriority, TicketStatus } from "../types";

const STATUS_CLASS: Record<TicketStatus, string> = {
    OPEN: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    IN_PROGRESS: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
    RESOLVED: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    CLOSED: "bg-secondary text-secondary-foreground",
};

const PRIORITY_CLASS: Record<TicketPriority, string> = {
    LOW: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    MEDIUM: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
    HIGH: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
    URGENT: "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:focus-visible:ring-destructive/40",
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
    const { t } = useTranslation("ticket");
    return <Badge className={STATUS_CLASS[status]}>{t(`status.${status}`)}</Badge>;
}

export function TicketPriorityBadge({ priority }: { priority: TicketPriority | null }) {
    const { t } = useTranslation("ticket");
    if (!priority) return <span className="text-muted-foreground">—</span>;
    return <Badge className={PRIORITY_CLASS[priority]}>{t(`priority.${priority}`)}</Badge>;
}
