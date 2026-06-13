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
import { memo } from "react";
import { ChartPieIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Pie, PieChart } from "recharts";
import { dashboardSummaryQueryOption } from "../queries/dashboard.query";

export const DashboardPriorityChart = memo(function DashboardPriorityChart() {
    const { t } = useTranslation("dashboard");
    const { data, isLoading } = useQuery(dashboardSummaryQueryOption());
    const summary = data?.data;

    const chartConfig = {
        low: { label: t("charts.low"), color: "#22c55e" },
        medium: { label: t("charts.medium"), color: "#eab308" },
        high: { label: t("charts.high"), color: "#f97316" },
        urgent: { label: t("charts.urgent"), color: "#ef4444" },
    } satisfies ChartConfig;

    const pieData = summary
        ? [
              { name: "low", value: summary.priority.low, fill: "#22c55e" },
              { name: "medium", value: summary.priority.medium, fill: "#eab308" },
              { name: "high", value: summary.priority.high, fill: "#f97316" },
              { name: "urgent", value: summary.priority.urgent, fill: "#ef4444" },
          ]
        : [];

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                        <ChartPieIcon className="size-3.5 text-muted-foreground" />
                        {t("charts.byPriority")}
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
});
