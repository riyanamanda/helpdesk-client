import type { ColumnDef } from "@tanstack/react-table";
import type { Patient } from "../types";
import type { TFunction } from "i18next";

export const getPatientColumns = (
    t: TFunction<"satuSehat">,
    pageOffset = 0
): ColumnDef<Patient>[] => [
    {
        id: "no",
        header: t("common:table.no"),
        cell: ({ row }) => <div>{pageOffset + row.index + 1}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "name",
        header: t("column.name"),
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "ktp",
        header: "KTP",
        cell: ({ row }) => <div>{row.getValue("ktp")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "http_method",
        header: t("column.httpMethod"),
        cell: ({ row }) => <div>{row.getValue("http_method")}</div>,
        enableSorting: false,
    },
];
