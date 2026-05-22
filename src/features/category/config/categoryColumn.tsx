import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants";
import { formatDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBigIcon, MoreHorizontalIcon, X } from "lucide-react";
import { NavLink } from "react-router";
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
    {
        id: "action",
        cell: ({ row }) => {
            const category = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <NavLink
                            to={ROUTES.CATEGORY.EDIT.replace(
                                ":id",
                                String(category.id)
                            )}
                        >
                            <DropdownMenuItem>Update</DropdownMenuItem>
                        </NavLink>
                        <DropdownMenuItem variant="destructive">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
