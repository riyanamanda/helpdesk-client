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
import { useQuery } from "@tanstack/react-query";
import { ChartPieIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Pie, PieChart } from "recharts";
import { dashboardSummaryQueryOption } from "../queries/dashboard.query";

export function DashboardStatusChart() {
    const { t } = useTranslation("dashboard");
    const { data, isLoading } = useQuery(dashboardSummaryQueryOption());
    const summary = data?.data;

    const chartConfig = {
        open: { label: t("charts.open"), color: "#3b82f6" },
        in_progress: { label: t("charts.inProgress"), color: "#eab308" },
        resolved: { label: t("charts.resolved"), color: "#22c55e" },
        closed: { label: t("charts.closed"), color: "#94a3b8" },
    } satisfies ChartConfig;

    const pieData = summary
        ? [
              { name: "open", value: summary.status.open, fill: "#3b82f6" },
              { name: "in_progress", value: summary.status.in_progress, fill: "#eab308" },
              { name: "resolved", value: summary.status.resolved, fill: "#22c55e" },
              { name: "closed", value: summary.status.closed, fill: "#94a3b8" },
          ]
        : [];

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                        <ChartPieIcon className="size-3.5 text-muted-foreground" />
                        {t("charts.byStatus")}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="mx-auto h-48 w-48 rounded-full" />
                ) : (
                    <ChartContainer config={chartConfig} className="mx-auto max-h-56">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={55}
                                outerRadius={80}
                                strokeWidth={2}
                            />
                            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
