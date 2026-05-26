import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants";
import { TicketPriorityBadge, TicketStatusBadge } from "@/features/ticket/components/TicketBadges";
import type { TicketPriority, TicketStatus } from "@/features/ticket/types";
import { formatDate } from "@/lib/formatters";
import { useQuery } from "@tanstack/react-query";
import {
    AlertCircleIcon,
    CheckCircle2Icon,
    CircleDotIcon,
    ClockIcon,
    InboxIcon,
    ListCollapseIcon,
    TicketIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts";
import {
    dashboardRecentTicketsQueryOption,
    dashboardSummaryQueryOption,
} from "../queries/dashboard.query";

const statusChartConfig = {
    open: { label: "Open", color: "#3b82f6" },
    in_progress: { label: "In Progress", color: "#eab308" },
    resolved: { label: "Resolved", color: "#22c55e" },
    closed: { label: "Closed", color: "#94a3b8" },
} satisfies ChartConfig;

const priorityChartConfig = {
    count: { label: "Tickets" },
} satisfies ChartConfig;

function StatCard({
    label,
    value,
    icon,
    valueClass = "",
    isLoading,
}: {
    label: string;
    value: number | undefined;
    icon: React.ReactNode;
    valueClass?: string;
    isLoading: boolean;
}) {
    return (
        <Card>
            <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground">{label}</span>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <span className={`text-3xl font-bold ${valueClass}`}>{value ?? 0}</span>
                        )}
                    </div>
                    <div className="rounded-md bg-muted p-2 text-muted-foreground">{icon}</div>
                </div>
            </CardContent>
        </Card>
    );
}

export function DashboardPage() {
    const { data: summaryData, isLoading: isSummaryLoading } = useQuery(
        dashboardSummaryQueryOption()
    );
    const { data: recentData, isLoading: isRecentLoading } = useQuery(
        dashboardRecentTicketsQueryOption()
    );

    const summary = summaryData?.data;
    const recentTickets = recentData?.data ?? [];

    const statusPieData = summary
        ? [
              { name: "open", value: summary.by_status.open, fill: "#3b82f6" },
              { name: "in_progress", value: summary.by_status.in_progress, fill: "#eab308" },
              { name: "resolved", value: summary.by_status.resolved, fill: "#22c55e" },
              { name: "closed", value: summary.by_status.closed, fill: "#94a3b8" },
          ]
        : [];

    const priorityBarData = summary
        ? [
              { priority: "Low", count: summary.by_priority.low, fill: "#22c55e" },
              { priority: "Medium", count: summary.by_priority.medium, fill: "#eab308" },
              { priority: "High", count: summary.by_priority.high, fill: "#f97316" },
              { priority: "Urgent", count: summary.by_priority.urgent, fill: "#ef4444" },
          ]
        : [];

    return (
        <PageLayout>
            <PageLayout.Header title="Dashboard" description="Helpdesk overview" />
            <PageLayout.Content>
                {/* Stat cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <StatCard
                        label="Total Tickets"
                        value={summary?.by_status.total}
                        icon={<TicketIcon className="size-4" />}
                        isLoading={isSummaryLoading}
                    />
                    <StatCard
                        label="Open"
                        value={summary?.by_status.open}
                        icon={<InboxIcon className="size-4" />}
                        valueClass="text-blue-600"
                        isLoading={isSummaryLoading}
                    />
                    <StatCard
                        label="In Progress"
                        value={summary?.by_status.in_progress}
                        icon={<CircleDotIcon className="size-4" />}
                        valueClass="text-yellow-600"
                        isLoading={isSummaryLoading}
                    />
                    <StatCard
                        label="Resolved"
                        value={summary?.by_status.resolved}
                        icon={<CheckCircle2Icon className="size-4" />}
                        valueClass="text-green-600"
                        isLoading={isSummaryLoading}
                    />
                    <StatCard
                        label="Closed"
                        value={summary?.by_status.closed}
                        icon={<ClockIcon className="size-4" />}
                        isLoading={isSummaryLoading}
                    />
                </div>

                {/* Charts row */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Status donut */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Tickets by Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isSummaryLoading ? (
                                <Skeleton className="mx-auto h-48 w-48 rounded-full" />
                            ) : (
                                <ChartContainer
                                    config={statusChartConfig}
                                    className="mx-auto max-h-56"
                                >
                                    <PieChart>
                                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                        <Pie
                                            data={statusPieData}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={55}
                                            outerRadius={80}
                                            strokeWidth={2}
                                        />
                                        <ChartLegend
                                            content={<ChartLegendContent nameKey="name" />}
                                        />
                                    </PieChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>

                    {/* Priority bar chart */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Tickets by Priority
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isSummaryLoading ? (
                                <div className="flex h-48 items-end gap-4 px-4">
                                    {[60, 90, 40, 70].map((h, i) => (
                                        <Skeleton
                                            key={i}
                                            className="flex-1"
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <ChartContainer
                                    config={priorityChartConfig}
                                    className="max-h-56 w-full"
                                >
                                    <BarChart data={priorityBarData} barSize={36}>
                                        <XAxis
                                            dataKey="priority"
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            allowDecimals={false}
                                            tick={{ fontSize: 12 }}
                                            width={24}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent tickets */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <AlertCircleIcon className="size-4 text-muted-foreground" />
                            Recent Open &amp; In Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isRecentLoading ? (
                            <div className="flex flex-col gap-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-full" />
                                ))}
                            </div>
                        ) : !recentTickets.length ? (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No open tickets
                            </p>
                        ) : (
                            <div className="flex flex-col divide-y">
                                {recentTickets.map((t) => (
                                    <div
                                        key={t.id}
                                        className="flex items-center justify-between gap-3 py-3"
                                    >
                                        <div className="flex min-w-0 flex-col gap-1">
                                            <span className="truncate text-sm font-medium">
                                                {t.title}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <TicketStatusBadge
                                                    status={t.status as TicketStatus}
                                                />
                                                <TicketPriorityBadge
                                                    priority={
                                                        t.priority
                                                            ? (t.priority as TicketPriority)
                                                            : null
                                                    }
                                                />
                                                <span className="text-[11px] text-muted-foreground">
                                                    {formatDate(t.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-2">
                                            {t.assigned_to ? (
                                                <Badge variant="outline" className="text-[11px]">
                                                    {t.assigned_to}
                                                </Badge>
                                            ) : (
                                                <span className="text-[11px] text-muted-foreground">
                                                    Unassigned
                                                </span>
                                            )}
                                            <NavLink
                                                to={ROUTES.TICKET.DETAIL.replace(
                                                    ":id",
                                                    String(t.id)
                                                )}
                                            >
                                                <Button variant="ghost" size="sm">
                                                    <ListCollapseIcon className="size-3.5" />
                                                </Button>
                                            </NavLink>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </PageLayout.Content>
        </PageLayout>
    );
}
