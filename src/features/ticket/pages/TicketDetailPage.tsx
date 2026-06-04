import { PageLayout } from "@/components/layout/PageLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants";
import { DeleteDialog } from "@/components/DeleteDialog";
import { useIsAdmin } from "@/hooks/use-current-user";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
    AlignLeftIcon,
    ArrowLeftIcon,
    Building2Icon,
    CheckCircle2Icon,
    CircleDotIcon,
    CircleIcon,
    ClockIcon,
    PaperclipIcon,
    TagIcon,
    UsersIcon,
    XCircleIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { AssignTicketSheet } from "../components/AssignTicketSheet";
import { AttachmentViewer } from "../components/AttachmentViewer";
import { ResolveTicketSheet } from "../components/ResolveTicketSheet";
import { SetPrioritySheet } from "../components/SetPrioritySheet";
import { TicketPriorityBadge, TicketStatusBadge } from "../components/TicketBadges";
import { useCloseTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import { getTicketQueryOption } from "../queries/ticket.query";
import type { TicketStatus } from "../types";

const STATUS_ACCENT: Record<TicketStatus, string> = {
    OPEN: "border-l-blue-500",
    IN_PROGRESS: "border-l-yellow-500",
    RESOLVED: "border-l-green-500",
    CLOSED: "border-l-muted-foreground/40",
};

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
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

export function TicketDetailPage() {
    const { id } = useParams();
    const { t } = useTranslation("ticket");
    const ticketId = Number(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: response } = useSuspenseQuery(getTicketQueryOption(ticketId));
    const ticket = response.data;
    const isAdmin = useIsAdmin();

    const { mutate: closeTicket, isPending: isClosing } = useCloseTicketMutation();

    const handleClose = () => {
        closeTicket(ticketId, {
            onSuccess: async () => {
                toast.success(t("common:toast.success"), {
                    description: t("close.closedSuccess"),
                });
                await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
                navigate(ROUTES.TICKET.INDEX, { replace: true });
            },
            onError: () => {
                toast.error(t("common:toast.operationFailed"), {
                    description: t("close.closeFailed"),
                });
            },
        });
    };

    const reportAttachments =
        ticket.attachment?.filter((a) => a.attachment_type === "REPORT") ?? [];
    const resolutionAttachments =
        ticket.attachment?.filter((a) => a.attachment_type === "RESOLUTION") ?? [];

    return (
        <PageLayout>
            <PageLayout.Header
                title={`Ticket #${ticket.id}`}
                actions={
                    <NavLink to={ROUTES.TICKET.INDEX}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeftIcon />
                            {t("detail.backToTickets")}
                        </Button>
                    </NavLink>
                }
            />
            <PageLayout.Content>
                <Card className={cn("border-l-4", STATUS_ACCENT[ticket.status])}>
                    <CardContent className="py-4">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-base leading-snug font-semibold">
                                    {ticket.title}
                                </h2>
                                <div className="flex flex-wrap items-center gap-2">
                                    <TicketStatusBadge status={ticket.status} />
                                    <TicketPriorityBadge priority={ticket.priority} />
                                    {ticket.category && (
                                        <Badge variant="outline" className="gap-1">
                                            <TagIcon className="size-3" />
                                            {ticket.category.name}
                                        </Badge>
                                    )}
                                    <Badge variant="outline" className="gap-1">
                                        <Building2Icon className="size-3" />
                                        {ticket.division.name}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 text-right">
                                <span className="text-[11px] text-muted-foreground">
                                    Created {formatDate(ticket.created_at)}
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                    Updated {formatDate(ticket.updated_at)}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="flex flex-col gap-4 lg:col-span-2">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                    <AlignLeftIcon className="size-4 text-muted-foreground" />
                                    {t("detail.description")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                                    {ticket.description}
                                </p>
                            </CardContent>
                        </Card>

                        {ticket.resolution && (
                            <Card className="border-green-500/30">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                        <CheckCircle2Icon className="size-4 text-green-500" />
                                        {t("detail.resolution")}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                                        {ticket.resolution}
                                    </p>
                                    {resolutionAttachments.length > 0 && (
                                        <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                                            {resolutionAttachments.map((a) => (
                                                <AttachmentViewer key={a.id} fileUrl={a.file_url} />
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {reportAttachments.length > 0 && (
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                        <PaperclipIcon className="size-4 text-muted-foreground" />
                                        {t("detail.attachments")}
                                        <span className="ml-auto text-xs font-normal text-muted-foreground">
                                            {reportAttachments.length}{" "}
                                            {reportAttachments.length !== 1
                                                ? t("detail.filesCount_other", {
                                                      count: reportAttachments.length,
                                                  })
                                                : t("detail.filesCount_one", {
                                                      count: reportAttachments.length,
                                                  })}
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    {reportAttachments.map((a) => (
                                        <AttachmentViewer key={a.id} fileUrl={a.file_url} />
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                    <UsersIcon className="size-4 text-muted-foreground" />
                                    {t("detail.people")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3">
                                <PersonRow
                                    label={t("detail.reporter")}
                                    name={ticket.created_by?.name}
                                />
                                <PersonRow
                                    label={t("detail.assignee")}
                                    name={ticket.assigned_to?.name}
                                />
                                <PersonRow
                                    label={t("detail.resolvedBy")}
                                    name={ticket.resolved_by?.name}
                                />
                                <PersonRow
                                    label={t("detail.closedBy")}
                                    name={ticket.closed_by?.name}
                                />
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
                                    isActive={
                                        ticket.status === "IN_PROGRESS" && !ticket.assigned_at
                                    }
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

                        {isAdmin && ticket.status !== "CLOSED" && (
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {t("detail.actions")}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    {ticket.status === "OPEN" && (
                                        <SetPrioritySheet
                                            ticketId={ticketId}
                                            currentPriority={ticket.priority}
                                        />
                                    )}
                                    {(ticket.status === "OPEN" ||
                                        ticket.status === "IN_PROGRESS") && (
                                        <AssignTicketSheet ticketId={ticketId} />
                                    )}
                                    {ticket.status === "IN_PROGRESS" && (
                                        <ResolveTicketSheet ticketId={ticketId} />
                                    )}
                                    {ticket.status === "RESOLVED" && (
                                        <DeleteDialog
                                            title={t("close.dialogTitle")}
                                            description={t("close.dialogDescription")}
                                            onConfirm={handleClose}
                                            isPending={isClosing}
                                            confirmLabel={t("close.confirmLabel")}
                                            pendingLabel={t("close.pendingLabel")}
                                            icon={<XCircleIcon />}
                                            trigger={
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="w-full"
                                                >
                                                    <XCircleIcon />
                                                    {t("close.closeButton")}
                                                </Button>
                                            }
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </PageLayout.Content>
        </PageLayout>
    );
}
