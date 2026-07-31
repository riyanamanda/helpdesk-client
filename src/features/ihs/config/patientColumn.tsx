import { CopyButton } from "@/components/CopyButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { formatDateTime, formatRelativeDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { NavLink } from "react-router";
import type { Patient } from "../types";

export const getPatientColumns = (t: TFunction<"ihs">, pageOffset = 0): ColumnDef<Patient>[] => [
    {
        id: "no",
        header: t("common:table.no"),
        cell: ({ row }) => <div>{pageOffset + row.index + 1}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "norm",
        header: t("column.norm"),
        cell: ({ row }) => {
            const norm = row.getValue("norm") as string;

            return (
                <div className="flex items-center gap-2">
                    <span>{norm}</span>
                    <CopyButton text={norm} />
                </div>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: "name",
        header: t("column.name"),
        cell: ({ row }) => (
            <NavLink to={ROUTES.IHS.DETAIL.replace(":norm", row.original.norm)}>
                <Button variant="link">{row.getValue("name")}</Button>
            </NavLink>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "identity_number",
        header: t("column.nik"),
        cell: ({ row }) => {
            const identity_number = row.getValue("identity_number") as string;

            return (
                <div className="flex items-center gap-2">
                    <span>{identity_number}</span>
                    <CopyButton text={identity_number} />
                </div>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: "http_method",
        header: t("column.httpMethod"),
        cell: ({ row }) => {
            const method = row.getValue("http_method") as string;
            return (
                <>
                    <Badge
                        variant="ghost"
                        className={method === "GET" ? "text-green-500" : "text-yellow-500"}
                    >
                        {method}
                    </Badge>

                    {method === "POST" && (
                        <Badge variant="destructive">{t("column.citizenshipNotFound")}</Badge>
                    )}
                </>
            );
        },
        enableSorting: true,
    },
    {
        accessorKey: "get_date",
        header: t("column.getDate"),
        cell: ({ row }) => <div>{formatDateTime(row.getValue("get_date"))}</div>,
        enableSorting: true,
    },
    {
        accessorKey: "last_registration",
        header: t("column.lastRegistration"),
        cell: ({ row }) => <div>{formatRelativeDate(row.getValue("last_registration"))}</div>,
        enableSorting: false,
    },
];
