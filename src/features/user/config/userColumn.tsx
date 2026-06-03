import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import {
    CircleCheckBigIcon,
    CircleXIcon,
    GlobeOffIcon,
    MarsIcon,
    RadioTowerIcon,
    VenusIcon,
} from "lucide-react";
import { UserActions } from "../components/UserActions";
import { UserAvatarCell } from "../components/UserAvatarCell";
import type { User } from "../types";

export const getUserColumns = (pageOffset = 0, loggedUserId?: string): ColumnDef<User>[] => [
    {
        id: "no",
        header: "No.",
        cell: ({ row }) => <div>{pageOffset + row.index + 1}</div>,
        enableSorting: false,
    },
    {
        id: "avatar",
        header: "Avatar",
        cell: ({ row }) => <UserAvatarCell user={row.original} />,
        enableSorting: false,
    },
    {
        accessorKey: "name",
        header: "Name",
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
        header: "Phone",
        cell: ({ row }) => (
            <div className="text-muted-foreground">{row.getValue("phone") ?? "-"}</div>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue("role") as string;
            const variantMap: Record<string, "default" | "secondary" | "outline"> = {
                ADMIN: "default",
                EMPLOYEE: "outline",
            };
            return <Badge variant={variantMap[role] ?? "outline"}>{role}</Badge>;
        },
        enableSorting: true,
    },
    {
        id: "division_id",
        accessorFn: (row) => row.division?.id,
        header: "Division",
        cell: ({ row }) => <div>{row.original.division?.name ?? "-"}</div>,
        enableSorting: true,
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => {
            const gender = row.original.gender;

            return (
                <Badge variant="outline">
                    {gender === "MALE" ? (
                        <>
                            <MarsIcon /> Male
                        </>
                    ) : (
                        <>
                            <VenusIcon /> Female
                        </>
                    )}
                </Badge>
            );
        },
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
        enableSorting: true,
    },
    {
        accessorKey: "google_id",
        header: "Google Account",
        cell: ({ row }) => {
            const status = row.getValue("google_id");
            return (
                <Badge variant={status ? "success" : "secondary"} className="px-1.5">
                    {status ? (
                        <>
                            <RadioTowerIcon />
                            Connected
                        </>
                    ) : (
                        <>
                            <GlobeOffIcon />
                            Disconnect
                        </>
                    )}
                </Badge>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: "created_by",
        header: "Created By",
        cell: ({ row }) => <div>{row.original.created_by?.name ?? "System"}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => <div>{formatDate(row.getValue("created_at"))}</div>,
        enableSorting: true,
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
            if (row.original.id === loggedUserId) return null;
            return <UserActions user={row.original} />;
        },
        enableSorting: false,
    },
];
