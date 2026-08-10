import { useQuery } from "@tanstack/react-query";
import {
    ArchiveIcon,
    CheckCircle2Icon,
    LoaderCircleIcon,
    TicketIcon,
    UserXIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { dashboardSummaryQueryOption } from "../queries/dashboard.query";
import { StatCard } from "./StatCard";

export function DashboardStatCards() {
    const { t } = useTranslation("dashboard");
    const { data, isLoading } = useQuery(dashboardSummaryQueryOption());
    const summary = data?.data;

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <StatCard
                label={t("stats.totalTickets")}
                value={summary?.status.total}
                icon={<TicketIcon className="size-4" />}
                iconClass="bg-primary/10 text-primary"
                isLoading={isLoading}
            />
            <StatCard
                label={t("stats.unassigned")}
                value={summary?.status.unassigned}
                icon={<UserXIcon className="size-4" />}
                valueClass="text-orange-600"
                iconClass="bg-orange-50 text-orange-600 dark:bg-orange-950/50"
                isLoading={isLoading}
            />
            <StatCard
                label={t("stats.inProgress")}
                value={summary?.status.in_progress}
                icon={<LoaderCircleIcon className="size-4" />}
                valueClass="text-amber-600"
                iconClass="bg-amber-50 text-amber-600 dark:bg-amber-950/50"
                isLoading={isLoading}
            />
            <StatCard
                label={t("stats.resolved")}
                value={summary?.status.resolved}
                icon={<CheckCircle2Icon className="size-4" />}
                valueClass="text-emerald-600"
                iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50"
                isLoading={isLoading}
            />
            <StatCard
                label={t("stats.closed")}
                value={summary?.status.closed}
                icon={<ArchiveIcon className="size-4" />}
                iconClass="bg-slate-100 text-slate-500 dark:bg-slate-800"
                isLoading={isLoading}
            />
        </div>
    );
}
