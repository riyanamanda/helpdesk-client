import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { formatDate, formatRelativeDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { NavLink } from "react-router";
import { TicketActions } from "../components/TicketActions";
import { TicketPriorityBadge, TicketStatusBadge } from "../components/TicketBadges";
import type { Ticket } from "../types";

export const getTicketColumns = (
    t: TFunction<"ticket">,
    pageOffset = 0,
    currentLanguage = "id"
): ColumnDef<Ticket>[] => [
    {
        id: "no",
        header: t("common:table.no"),
        cell: ({ row }) => <div>{pageOffset + row.index + 1}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "title",
        header: t("columns.title"),
        cell: ({ row }) => (
            <NavLink
                to={ROUTES.TICKET.DETAIL.replace(":id", String(row.original.id))}
                className="truncate font-medium hover:underline"
            >
                <Button variant="link">{row.getValue("title")}</Button>
            </NavLink>
        ),
        enableSorting: false,
    },
    {
        id: "category",
        header: t("columns.category"),
        cell: ({ row }) => <div>{row.original.category?.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        id: "division",
        header: t("columns.room"),
        cell: ({ row }) => <div>{row.original.division.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        id: "created_by",
        header: t("columns.reportedBy"),
        cell: ({ row }) => <div>{row.original.created_by?.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "priority",
        header: t("columns.priority"),
        cell: ({ row }) => <TicketPriorityBadge priority={row.getValue("priority")} />,
        enableSorting: true,
    },
    {
        id: "assigned_to",
        header: t("columns.assignedTo"),
        cell: ({ row }) => <div>{row.original.assigned_to?.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        id: "resolved_by",
        header: t("columns.resolvedBy"),
        cell: ({ row }) => <div>{row.original.resolved_by?.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        id: "closed_by",
        header: t("columns.closedBy"),
        cell: ({ row }) => <div>{row.original.closed_by?.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "created_at",
        header: t("common:table.createdAt"),
        cell: ({ row }) => <div>{formatDate(row.getValue("created_at"), currentLanguage)}</div>,
        enableSorting: true,
    },
    {
        accessorKey: "updated_at",
        header: t("common:table.updatedAt"),
        cell: ({ row }) => (
            <div>{formatRelativeDate(row.getValue("updated_at"), currentLanguage)}</div>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "status",
        header: t("common:table.status"),
        cell: ({ row }) => <TicketStatusBadge status={row.getValue("status")} />,
        enableSorting: true,
    },
    {
        id: "action",
        cell: ({ row }) => {
            return <TicketActions ticket={row.original} />;
        },
        enableSorting: false,
    },
];
