import { DeleteDialog } from "@/components/DeleteDialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PERMISSIONS } from "@/constants/permissions";
import { useHasPermission } from "@/hooks/use-current-user";
import { formatDate, getInitials } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { TFunction } from "i18next";
import {
    CheckCircle2Icon,
    CircleDotIcon,
    CircleIcon,
    ClockIcon,
    UsersIcon,
    XCircleIcon,
} from "lucide-react";
import { AssignTicketSheet } from "./AssignTicketSheet";
import { ResolveTicketSheet } from "./ResolveTicketSheet";
import { SetPrioritySheet } from "./SetPrioritySheet";
import type { TicketDetail } from "../types";

interface TicketDetailSidebarProps {
    t: TFunction<"ticket">;
    ticket: TicketDetail;
    ticketId: number;
    canClose: boolean;
    canDelete: boolean;
    onClose: () => void;
    onDelete: () => void;
    isClosing: boolean;
    isDeleting: boolean;
}

function PersonRow({ label, name }: { label: string; name?: string | null }) {
    if (!name) return null;
    return (
        <div className="flex items-center gap-2.5">
            <Avatar size="sm">
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-[11px] text-muted-foreground">{label}</span>
                <span className="text-xs font-medium">{name}</span>
            </div>
        </div>
    );
}

function TimelineStep({
    label,
    date,
    person,
    by,
    isDone,
    isActive,
    isLast,
}: {
    label: string;
    date: string | null;
    person?: string | null;
    by: string;
    isDone: boolean;
    isActive?: boolean;
    isLast?: boolean;
}) {
    return (
        <div className="flex gap-3">
            <div className="flex flex-col items-center">
                <div
                    className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full",
                        isDone
                            ? "bg-primary text-primary-foreground"
                            : isActive
                              ? "border-2 border-primary text-primary"
                              : "border-2 border-border text-muted-foreground"
                    )}
                >
                    {isDone ? (
                        <CheckCircle2Icon className="size-3" />
                    ) : isActive ? (
                        <CircleDotIcon className="size-3" />
                    ) : (
                        <CircleIcon className="size-3" />
                    )}
                </div>
                {!isLast && (
                    <div
                        className={cn("my-1 w-0.5 flex-1", isDone ? "bg-primary/40" : "bg-border")}
                        style={{ minHeight: "1.5rem" }}
                    />
                )}
            </div>
            <div className={cn("pb-4", isLast && "pb-0")}>
                <p
                    className={cn(
                        "text-xs font-medium",
                        !isDone && !isActive && "text-muted-foreground"
                    )}
                >
                    {label}
                </p>
                {isDone && date && (
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{formatDate(date)}</p>
                )}
                {isDone && person && (
                    <p className="text-[11px] text-muted-foreground">
                        {by} {person}
                    </p>
                )}
            </div>
        </div>
    );
}

export function TicketDetailSidebar({
    t,
    ticket,
    ticketId,
    canClose,
    canDelete,
    onClose,
    onDelete,
    isClosing,
    isDeleting,
}: TicketDetailSidebarProps) {
    const canSetPriority = useHasPermission(PERMISSIONS.TICKET.PRIORITY);
    const canAssign = useHasPermission(PERMISSIONS.TICKET.ASSIGN);
    const canResolve = useHasPermission(PERMISSIONS.TICKET.RESOLUTION);

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                        <UsersIcon className="size-4 text-muted-foreground" />
                        {t("detail.people")}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <PersonRow label={t("detail.reporter")} name={ticket.created_by?.name} />
                    <PersonRow label={t("detail.assignee")} name={ticket.assigned_to?.name} />
                    <PersonRow label={t("detail.resolvedBy")} name={ticket.resolved_by?.name} />
                    <PersonRow label={t("detail.closedBy")} name={ticket.closed_by?.name} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                        <ClockIcon className="size-4 text-muted-foreground" />
                        {t("detail.timeline")}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <TimelineStep
                        label={t("detail.created")}
                        date={ticket.created_at}
                        person={ticket.created_by?.name}
                        by={t("detail.by")}
                        isDone
                    />
                    <TimelineStep
                        label={t("detail.assigned")}
                        date={ticket.assigned_at}
                        person={ticket.assigned_to?.name}
                        by={t("detail.by")}
                        isDone={!!ticket.assigned_at}
                        isActive={ticket.status === "IN_PROGRESS" && !ticket.assigned_at}
                    />
                    <TimelineStep
                        label={t("detail.resolved")}
                        date={ticket.resolved_at}
                        person={ticket.resolved_by?.name}
                        by={t("detail.by")}
                        isDone={!!ticket.resolved_at}
                        isActive={ticket.status === "IN_PROGRESS"}
                    />
                    <TimelineStep
                        label={t("detail.closed")}
                        date={ticket.closed_at}
                        person={ticket.closed_by?.name}
                        by={t("detail.by")}
                        isDone={!!ticket.closed_at}
                        isActive={ticket.status === "RESOLVED"}
                        isLast
                    />
                </CardContent>
            </Card>

            {(canSetPriority || canAssign || canResolve || canClose || canDelete) && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{t("detail.actions")}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {canSetPriority && ticket.status === "OPEN" && (
                            <SetPrioritySheet
                                ticketId={ticketId}
                                currentPriority={ticket.priority}
                            />
                        )}
                        {canAssign &&
                            (ticket.status === "OPEN" || ticket.status === "IN_PROGRESS") && (
                                <AssignTicketSheet ticketId={ticketId} />
                            )}
                        {canResolve && ticket.status === "IN_PROGRESS" && (
                            <ResolveTicketSheet ticketId={ticketId} />
                        )}
                        {canClose && (
                            <DeleteDialog
                                title={t("close.dialogTitle")}
                                description={t("close.dialogDescription")}
                                onConfirm={onClose}
                                isPending={isClosing}
                                confirmLabel={t("close.confirmLabel")}
                                pendingLabel={t("close.pendingLabel")}
                                icon={<XCircleIcon />}
                                trigger={
                                    <Button variant="destructive" size="sm" className="w-full">
                                        <XCircleIcon />
                                        {t("close.closeButton")}
                                    </Button>
                                }
                            />
                        )}
                        {canDelete && (
                            <DeleteDialog
                                title={t("delete.title")}
                                description={t("delete.description", { name: ticket.title })}
                                onConfirm={onDelete}
                                isPending={isDeleting}
                                trigger={
                                    <Button variant="destructive" size="sm" className="w-full">
                                        <XCircleIcon />
                                        {t("actions.delete")}
                                    </Button>
                                }
                            />
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
