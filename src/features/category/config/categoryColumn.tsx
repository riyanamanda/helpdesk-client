import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBigIcon, X } from "lucide-react";
import { CategoryActions } from "../components/CategoryActions";
import type { Category } from "../types";

export const getCategoryColumns = (pageOffset = 0): ColumnDef<Category>[] => [
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
                <Badge
                    variant="outline"
                    className={`px-1.5 ${status ? "text-green-500" : "text-muted-foreground"}`}
                >
                    {status ? (
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
    {
        id: "action",
        cell: ({ row }) => <CategoryActions category={row.original} />,
    },
];
