import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { UsersIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { dashboardAgentWorkloadQueryOption } from "../queries/dashboard.query";

export function DashboardAgentWorkload() {
    const { t } = useTranslation("dashboard");
    const { data, isLoading } = useQuery(dashboardAgentWorkloadQueryOption());
    const agents = data?.data ?? [];

    const chartConfig = {
        in_progress: { label: t("agentWorkload.inProgress"), color: "#eab308" },
        resolved: { label: t("agentWorkload.resolved"), color: "#22c55e" },
    } satisfies ChartConfig;

    const chartData = agents.map((a) => ({
        name: a.agent_name,
        in_progress: a.in_progress,
        resolved: a.resolved,
    }));

    const barHeight = 40;
    const minHeight = 120;
    const chartHeight = Math.max(minHeight, chartData.length * barHeight);

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                        <UsersIcon className="size-3.5 text-muted-foreground" />
                        {t("agentWorkload.title")}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                        {t("agentWorkload.topN")}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-3 px-2 py-1">
                        {[80, 55, 70, 40, 65].map((w, i) => (
                            <Skeleton key={i} className="h-6 rounded" style={{ width: `${w}%` }} />
                        ))}
                    </div>
                ) : chartData.length === 0 ? (
                    <p className="py-10 text-center text-sm text-muted-foreground">
                        {t("agentWorkload.noData")}
                    </p>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        style={{ height: chartHeight }}
                        className="w-full"
                    >
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            barSize={14}
                            barCategoryGap="30%"
                        >
                            <CartesianGrid
                                horizontal={false}
                                strokeDasharray="4 4"
                                className="stroke-border/60"
                            />
                            <XAxis
                                type="number"
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                                tick={{ fontSize: 11 }}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12 }}
                                width={110}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="in_progress"
                                stackId="a"
                                fill="var(--color-in_progress)"
                                radius={[0, 0, 0, 0]}
                            />
                            <Bar
                                dataKey="resolved"
                                stackId="a"
                                fill="var(--color-resolved)"
                                radius={[0, 4, 4, 0]}
                            />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
