import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import type { Antrian } from "../types";
import { CheckInButton } from "../components/CheckInButton";

function getStatusBadge(status: number, waktuCheckIn: string | null, t: TFunction) {
    if (status === 1 && !waktuCheckIn) {
        return (
            <Badge variant="ghost" className="text-yellow-500">
                {t("status.notCheckedIn")}
            </Badge>
        );
    }
    if (status === 1 && waktuCheckIn) {
        return (
            <Badge variant="ghost" className="text-green-500">
                {t("status.checkedIn")}
            </Badge>
        );
    }
    if (status === 2 && waktuCheckIn) {
        return <Badge variant="secondary">{t("status.registered")}</Badge>;
    }
    if (status === 0 || status === 99) {
        return <Badge variant="destructive">{t("status.cancelled")}</Badge>;
    }
    return <span>-</span>;
}

export const getAntrianColumns = (
    t: TFunction<"antrian">,
    pageOffset = 0
): ColumnDef<Antrian>[] => [
    {
        id: "no",
        header: t("common:table.no"),
        cell: ({ row }) => <div>{pageOffset + row.index + 1}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "kode_booking",
        header: t("column.kodeBooking"),
        cell: ({ row }) => <div>{row.getValue("kode_booking")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "no_antrian",
        header: t("column.noAntrian"),
        cell: ({ row }) => <div className="font-medium">{row.getValue("no_antrian")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "norm",
        header: t("column.norm"),
        cell: ({ row }) => <div>{row.getValue("norm")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "nama",
        header: t("column.nama"),
        cell: ({ row }) => <div>{row.getValue("nama")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "no_kartu_bpjs",
        header: t("column.noKartuBpjs"),
        cell: ({ row }) => <div>{row.getValue("no_kartu_bpjs")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "dokter",
        header: t("column.dokter"),
        cell: ({ row }) => <div>{row.getValue("dokter")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "poli",
        header: t("column.poli"),
        cell: ({ row }) => <div>{row.getValue("poli")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "status",
        header: t("column.status"),
        cell: ({ row }) => getStatusBadge(row.original.status, row.original.waktu_check_in, t),
        enableSorting: false,
    },
    {
        id: "action",
        header: t("common:table.action"),
        cell: ({ row }) => <CheckInButton antrian={row.original} t={t} />,
        enableSorting: false,
    },
];
