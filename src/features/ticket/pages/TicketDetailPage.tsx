import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants";
import { useCurrentUser, useIsAdmin } from "@/hooks/use-current-user";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, Building2Icon, TagIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { TicketDetailContent } from "../components/TicketDetailContent";
import { TicketDetailSidebar } from "../components/TicketDetailSidebar";
import { TicketPriorityBadge, TicketStatusBadge } from "../components/TicketBadges";
import { useCloseTicketMutation, useDeleteTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import { getTicketQueryOption } from "../queries/ticket.query";
import type { TicketStatus } from "../types";

const STATUS_ACCENT: Record<TicketStatus, string> = {
    OPEN: "border-l-blue-500",
    IN_PROGRESS: "border-l-yellow-500",
    RESOLVED: "border-l-green-500",
    CLOSED: "border-l-muted-foreground/40",
};

export function TicketDetailPage() {
    const { id } = useParams();
    const { t } = useTranslation("ticket");
    const ticketId = Number(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: response } = useSuspenseQuery(getTicketQueryOption(ticketId));
    const ticket = response.data;
    const isAdmin = useIsAdmin();
    const currentUser = useCurrentUser();

    const canEdit = currentUser?.id === ticket.created_by?.id && ticket.status === "OPEN";
    const canDelete =
        ticket.status === "OPEN" && (isAdmin || currentUser?.id === ticket.created_by?.id);

    const { mutate: closeTicket, isPending: isClosing } = useCloseTicketMutation();
    const { mutate: deleteTicket, isPending: isDeleting } = useDeleteTicketMutation();

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

    const handleDelete = () => {
        deleteTicket(ticketId, {
            onSuccess: async () => {
                toast.success(t("common:toast.success"), {
                    description: t("delete.deletedSuccess"),
                });
                await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
                navigate(ROUTES.TICKET.INDEX, { replace: true });
            },
            onError: () => {
                toast.error(t("common:toast.operationFailed"), {
                    description: t("delete.deleteFailed"),
                });
            },
        });
    };

    return (
        <PageLayout>
            <PageLayout.Header
                title={`Ticket #${ticket.id}`}
                actions={
                    <div className="flex items-center gap-2">
                        {canEdit && (
                            <NavLink to={ROUTES.TICKET.EDIT.replace(":id", String(ticket.id))}>
                                <Button variant="outline" size="sm">
                                    {t("actions.edit")}
                                </Button>
                            </NavLink>
                        )}
                        <NavLink to={ROUTES.TICKET.INDEX}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeftIcon />
                                {t("detail.backToTickets")}
                            </Button>
                        </NavLink>
                    </div>
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
                    <TicketDetailContent ticket={ticket} t={t} />
                    <TicketDetailSidebar
                        t={t}
                        ticket={ticket}
                        ticketId={ticketId}
                        isAdmin={isAdmin}
                        canDelete={canDelete}
                        onClose={handleClose}
                        onDelete={handleDelete}
                        isClosing={isClosing}
                        isDeleting={isDeleting}
                    />
                </div>
            </PageLayout.Content>
        </PageLayout>
    );
}
