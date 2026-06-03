import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { CircleCheckBigIcon, CircleXIcon } from "lucide-react";
import { DivisionActions } from "../components/DivisionActions";
import type { Division } from "../types";

export const getDivisionColumns = (
    t: TFunction<"division">,
    pageOffset = 0
): ColumnDef<Division>[] => [
    {
        id: "no",
        header: t("common:table.no"),
        cell: ({ row }) => <div>{pageOffset + row.index + 1}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "name",
        header: t("common:table.name"),
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
        enableSorting: true,
    },
    {
        accessorKey: "is_active",
        header: t("common:table.status"),
        cell: ({ row }) => {
            const status = row.getValue("is_active");
            return (
                <Badge variant={status ? "success" : "destructive"} className="px-1.5">
                    {status ? (
                        <>
                            <CircleCheckBigIcon />
                            {t("columns.active")}
                        </>
                    ) : (
                        <>
                            <CircleXIcon />
                            {t("columns.inactive")}
                        </>
                    )}
                </Badge>
            );
        },
        enableSorting: true,
    },
    {
        accessorKey: "created_at",
        header: t("common:table.createdAt"),
        cell: ({ row }) => <div>{formatDate(row.getValue("created_at"))}</div>,
        enableSorting: true,
    },
    {
        accessorKey: "updated_at",
        header: t("common:table.updatedAt"),
        cell: ({ row }) => <div>{formatDate(row.getValue("updated_at"))}</div>,
        enableSorting: false,
    },
    {
        id: "action",
        cell: ({ row }) => <DivisionActions division={row.original} />,
        enableSorting: false,
    },
];
