import { ActiveStatusBadge } from "@/components/ActiveStatusBadge";
import { formatDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { CategoryActions } from "../components/CategoryActions";
import type { Category } from "../types";

export const getCategoryColumns = (
    t: TFunction<"category">,
    pageOffset = 0
): ColumnDef<Category>[] => [
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
        cell: ({ row }) => (
            <ActiveStatusBadge
                isActive={row.getValue("is_active")}
                activeLabel={t("columns.active")}
                inactiveLabel={t("columns.inactive")}
            />
        ),
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
        cell: ({ row }) => <CategoryActions category={row.original} />,
        enableSorting: false,
    },
];
