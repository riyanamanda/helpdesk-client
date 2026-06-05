import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ChartBarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { dashboardSummaryQueryOption } from "../queries/dashboard.query";

export function DashboardPriorityChart() {
    const { t } = useTranslation("dashboard");
    const { data, isLoading } = useQuery(dashboardSummaryQueryOption());
    const summary = data?.data;

    const chartConfig = {
        count: { label: t("charts.tickets") },
    } satisfies ChartConfig;

    const barData = summary
        ? [
              { priority: t("charts.low"), count: summary.priority.low, fill: "#22c55e" },
              { priority: t("charts.medium"), count: summary.priority.medium, fill: "#eab308" },
              { priority: t("charts.high"), count: summary.priority.high, fill: "#f97316" },
              { priority: t("charts.urgent"), count: summary.priority.urgent, fill: "#ef4444" },
          ]
        : [];

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                        <ChartBarIcon className="size-3.5 text-muted-foreground" />
                        {t("charts.byPriority")}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex h-48 items-end gap-4 px-4">
                        {[60, 90, 40, 70].map((h, i) => (
                            <Skeleton key={i} className="flex-1" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                ) : (
                    <ChartContainer config={chartConfig} className="max-h-56 w-full">
                        <BarChart data={barData} barSize={36}>
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
    );
}
