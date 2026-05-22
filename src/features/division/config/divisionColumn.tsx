import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBigIcon, CircleXIcon } from "lucide-react";
import { DivisionActions } from "../components/DivisionActions";
import type { Division } from "../types";

export const getDivisionColumns = (pageOffset = 0): ColumnDef<Division>[] => [
    {
        id: "no",
        header: "No.",
        cell: ({ row }) => <div>{pageOffset + row.index + 1}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("is_active");
            return (
                <Badge variant={status ? "success" : "destructive"} className="px-1.5">
                    {status ? (
                        <>
                            <CircleCheckBigIcon />
                            Active
                        </>
                    ) : (
                        <>
                            <CircleXIcon />
                            Inactive
                        </>
                    )}
                </Badge>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => <div>{formatDate(row.getValue("created_at"))}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
        cell: ({ row }) => <div>{formatDate(row.getValue("updated_at"))}</div>,
        enableSorting: false,
    },
    {
        id: "action",
        cell: ({ row }) => <DivisionActions division={row.original} />,
    },
];
