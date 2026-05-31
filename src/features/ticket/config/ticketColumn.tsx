import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { formatRelativeDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { ListCollapseIcon } from "lucide-react";
import { NavLink } from "react-router";
import { TicketPriorityBadge, TicketStatusBadge } from "../components/TicketBadges";
import type { Ticket } from "../types";

export const getTicketColumns = (pageOffset = 0): ColumnDef<Ticket>[] => [
    {
        id: "no",
        header: "No.",
        cell: ({ row }) => <div>{pageOffset + row.index + 1}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "title",
        header: "Title",
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
        header: "Category",
        cell: ({ row }) => <div>{row.original.category?.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        id: "division",
        header: "Room",
        cell: ({ row }) => <div>{row.original.division.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        id: "created_by",
        header: "Reported By",
        cell: ({ row }) => <div>{row.original.created_by?.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => <TicketPriorityBadge priority={row.getValue("priority")} />,
        enableSorting: true,
    },
    {
        id: "assigned_to",
        header: "Assigned To",
        cell: ({ row }) => <div>{row.original.assigned_to?.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        id: "resolved_by",
        header: "Resolved by",
        cell: ({ row }) => <div>{row.original.resolved_by?.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        id: "closed_by",
        header: "Closed by",
        cell: ({ row }) => <div>{row.original.closed_by?.name ?? "-"}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => <div>{formatRelativeDate(row.getValue("created_at"))}</div>,
        enableSorting: true,
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
        cell: ({ row }) => <div>{formatRelativeDate(row.getValue("updated_at"))}</div>,
        enableSorting: true,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <TicketStatusBadge status={row.getValue("status")} />,
        enableSorting: true,
    },
    {
        id: "action",
        cell: ({ row }) => (
            <NavLink to={ROUTES.TICKET.DETAIL.replace(":id", String(row.original.id))}>
                <Button variant="ghost">
                    <ListCollapseIcon />
                    Detail
                </Button>
            </NavLink>
        ),
        enableSorting: false,
    },
];
