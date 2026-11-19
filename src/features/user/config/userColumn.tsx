import { Badge } from "@/components/ui/badge";
import i18n from "@/i18n";
import { formatDate, formatDateTime, formatRelativeDate } from "@/lib/formatters";
import { ROLE_META } from "@/lib/role";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import {
    CircleCheckBigIcon,
    CircleXIcon,
    GlobeIcon,
    GlobeOffIcon,
    KeyRoundIcon,
    MarsIcon,
    RadioTowerIcon,
    VenusIcon,
} from "lucide-react";
import { UserActions } from "../components/UserActions";
import { UserAvatarCell } from "../components/UserAvatarCell";
import type { User } from "../types";

export const getUserColumns = (
    t: TFunction<"user">,
    pageOffset = 0,
    loggedUserId?: string
): ColumnDef<User>[] => [
    {
        id: "no",
        header: t("common:table.no"),
        cell: ({ row }) => <div>{pageOffset + row.index + 1}</div>,
        enableSorting: false,
    },
    {
        id: "avatar",
        header: t("columns.avatar"),
        cell: ({ row }) => <UserAvatarCell user={row.original} />,
        enableSorting: false,
    },
    {
        accessorKey: "name",
        header: t("common:table.name"),
        cell: ({ row }) => (
            <div>
                <div className="font-medium">{row.original.name}</div>
                <div className="text-xs text-muted-foreground">{row.original.email}</div>
            </div>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "phone",
        header: t("columns.phone"),
        cell: ({ row }) => (
            <div className="text-muted-foreground">{row.getValue("phone") ?? "-"}</div>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "role",
        header: t("columns.role"),
        cell: ({ row }) => {
            const { label, className } = ROLE_META[row.original.role.name];
            return <Badge className={className}>{label}</Badge>;
        },
        enableSorting: true,
    },
    {
        id: "division_id",
        accessorFn: (row) => row.division?.id,
        header: t("columns.division"),
        cell: ({ row }) => <div>{row.original.division?.name ?? "-"}</div>,
        enableSorting: true,
    },
    {
        accessorKey: "gender",
        header: t("columns.gender"),
        cell: ({ row }) => {
            const gender = row.original.gender;

            return (
                <Badge variant="outline">
                    {gender === "MALE" ? (
                        <>
                            <MarsIcon /> {t("common:gender.male")}
                        </>
                    ) : (
                        <>
                            <VenusIcon /> {t("common:gender.female")}
                        </>
                    )}
                </Badge>
            );
        },
        enableSorting: false,
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
                            {t("common:status.active")}
                        </>
                    ) : (
                        <>
                            <CircleXIcon />
                            {t("common:status.inactive")}
                        </>
                    )}
                </Badge>
            );
        },
        enableSorting: true,
    },
    {
        accessorKey: "google_id",
        header: t("columns.googleAccount"),
        cell: ({ row }) => {
            const status = row.getValue("google_id");
            return (
                <Badge variant={status ? "success" : "secondary"} className="px-1.5">
                    {status ? (
                        <>
                            <RadioTowerIcon />
                            {t("common:status.connected")}
                        </>
                    ) : (
                        <>
                            <GlobeOffIcon />
                            {t("common:status.disconnected")}
                        </>
                    )}
                </Badge>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: "last_active_at",
        header: t("columns.lastActive"),
        cell: ({ row }) => {
            const { is_online, last_active_at } = row.original;
            return (
                <div
                    className="flex items-center gap-2 whitespace-nowrap"
                    title={formatDateTime(last_active_at)}
                >
                    <span
                        className={cn(
                            "size-2 shrink-0 rounded-full",
                            is_online ? "bg-green-500" : "bg-muted-foreground/40"
                        )}
                    />
                    {is_online
                        ? t("activity.online")
                        : last_active_at
                          ? formatRelativeDate(last_active_at, i18n.language)
                          : t("activity.never")}
                </div>
            );
        },
        enableSorting: true,
    },
    {
        accessorKey: "last_login_method",
        header: t("columns.lastLogin"),
        cell: ({ row }) => {
            const { last_login_method, last_login_at } = row.original;
            if (!last_login_method) return <div>-</div>;
            return (
                <div className="flex flex-col gap-1 whitespace-nowrap">
                    <Badge variant="outline" className="px-1.5">
                        {last_login_method === "GOOGLE" ? (
                            <>
                                <GlobeIcon />
                                {t("activity.google")}
                            </>
                        ) : (
                            <>
                                <KeyRoundIcon />
                                {t("activity.password")}
                            </>
                        )}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                        {formatDateTime(last_login_at)}
                    </span>
                </div>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: "created_by",
        header: t("columns.createdBy"),
        cell: ({ row }) => <div>{row.original.created_by?.name ?? "System"}</div>,
        enableSorting: false,
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
        cell: ({ row }) => {
            if (row.original.id === loggedUserId) return null;
            return <UserActions user={row.original} />;
        },
        enableSorting: false,
    },
];
