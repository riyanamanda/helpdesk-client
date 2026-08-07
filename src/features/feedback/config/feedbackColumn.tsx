import { formatDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { FeedbackActions } from "../components/FeedbackActions";
import {
    FeedbackDescriptionCell,
    FeedbackStatusCell,
    FeedbackTypeBadge,
} from "../components/FeedbackBadges";
import type { Feedback } from "../types";

export const getFeedbackColumns = (
    t: TFunction<"feedback">,
    pageOffset = 0
): ColumnDef<Feedback>[] => [
    {
        id: "no",
        header: t("common:table.no"),
        cell: ({ row }) => <div>{pageOffset + row.index + 1}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "title",
        header: t("columns.title"),
        cell: ({ row }) => (
            <div className="max-w-xs truncate font-medium">{row.getValue("title")}</div>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "description",
        header: t("columns.description"),
        cell: ({ row }) => <FeedbackDescriptionCell feedback={row.original} />,
        enableSorting: false,
    },
    {
        accessorKey: "type",
        header: t("columns.type"),
        cell: ({ row }) => <FeedbackTypeBadge type={row.getValue("type")} />,
        enableSorting: true,
    },
    {
        accessorKey: "status",
        header: t("common:table.status"),
        cell: ({ row }) => <FeedbackStatusCell feedback={row.original} />,
        enableSorting: true,
    },
    {
        accessorKey: "created_by",
        header: t("columns.submittedBy"),
        cell: ({ row }) => {
            const user = row.getValue<Feedback["created_by"]>("created_by");
            return <div>{user.name}</div>;
        },
        enableSorting: false,
    },
    {
        accessorKey: "reviewed_by",
        header: t("columns.reviewedBy"),
        cell: ({ row }) => {
            const reviewer = row.getValue<Feedback["reviewed_by"]>("reviewed_by");
            return <div>{reviewer?.name ?? <span className="text-muted-foreground">—</span>}</div>;
        },
        enableSorting: false,
    },
    {
        accessorKey: "reviewed_at",
        header: t("columns.reviewedAt"),
        cell: ({ row }) => {
            const date = row.getValue<string | null>("reviewed_at");
            return (
                <div>
                    {date ? formatDate(date) : <span className="text-muted-foreground">—</span>}
                </div>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: "created_at",
        header: t("common:table.createdAt"),
        cell: ({ row }) => <div>{formatDate(row.getValue("created_at"))}</div>,
        enableSorting: true,
    },
    {
        id: "action",
        cell: ({ row }) => {
            return <FeedbackActions feedback={row.original} />;
        },
        enableSorting: false,
    },
];
