import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBigIcon, X } from "lucide-react";
import type { Category } from "../types";

export const getCategoryColumns = (): ColumnDef<Category>[] => [
    {
        accessorKey: "id",
        header: "#ID",
        cell: ({ row }) => <div>{row.getValue("id")}</div>,
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
                <Badge
                    variant="outline"
                    className={`px-1.5 ${status ? "text-green-500" : "text-muted-foreground"}`}
                >
                    {status === true ? (
                        <>
                            <CircleCheckBigIcon />
                            Active
                        </>
                    ) : (
                        <>
                            <X />
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
];
