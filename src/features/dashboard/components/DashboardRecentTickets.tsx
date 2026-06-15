import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ROUTES } from "@/constants";
import { PERMISSIONS } from "@/constants/permissions";
import { TicketPriorityBadge, TicketStatusBadge } from "@/features/ticket/components/TicketBadges";
import type { TicketPriority, TicketStatus } from "@/features/ticket/types";
import { useHasPermission } from "@/hooks/use-current-user";
import { formatDate } from "@/lib/formatters";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { AlertCircleIcon, ArrowRightIcon, ListCollapseIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { dashboardRecentTicketsQueryOption } from "../queries/dashboard.query";

export const DashboardRecentTickets = memo(function DashboardRecentTickets() {
    const { t } = useTranslation("dashboard");
    const canViewTicket = useHasPermission(PERMISSIONS.TICKET.VIEW);
    const { data, isLoading } = useQuery(dashboardRecentTicketsQueryOption());
    const recentTickets = data?.data ?? [];

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm font-medium">
                    <span className="flex items-center gap-2">
                        <AlertCircleIcon className="size-4 text-muted-foreground" />
                        {t("recent.title")}
                    </span>
                    {canViewTicket && (
                        <NavLink
                            to={ROUTES.TICKET.INDEX}
                            className="flex items-center gap-1 text-xs font-normal text-muted-foreground hover:text-foreground"
                        >
                            {t("recent.viewAll")}
                            <ArrowRightIcon className="size-3" />
                        </NavLink>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                {isLoading ? (
                    <div className="flex flex-col gap-3 px-6 pb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                ) : !recentTickets.length ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                        {t("recent.noTickets")}
                    </p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="pl-6">{t("recent.col.title")}</TableHead>
                                <TableHead>{t("recent.col.status")}</TableHead>
                                <TableHead>{t("recent.col.priority")}</TableHead>
                                <TableHead>{t("recent.col.assignedTo")}</TableHead>
                                <TableHead>{t("recent.col.date")}</TableHead>
                                <TableHead className="pr-6" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentTickets.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell className="max-w-64 pl-6">
                                        <span className="block truncate text-sm font-medium">
                                            {ticket.title}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <TicketStatusBadge status={ticket.status as TicketStatus} />
                                    </TableCell>
                                    <TableCell>
                                        <TicketPriorityBadge
                                            priority={
                                                ticket.priority
                                                    ? (ticket.priority as TicketPriority)
                                                    : null
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {ticket.assigned_to ?? (
                                            <span className="italic">{t("recent.unassigned")}</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {formatDate(ticket.created_at)}
                                    </TableCell>
                                    <TableCell className="pr-6 text-right">
                                        {canViewTicket && (
                                            <NavLink
                                                to={ROUTES.TICKET.DETAIL.replace(
                                                    ":id",
                                                    String(ticket.id)
                                                )}
                                            >
                                                <Button variant="ghost" size="sm">
                                                    <ListCollapseIcon className="size-3.5" />
                                                </Button>
                                            </NavLink>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
});
