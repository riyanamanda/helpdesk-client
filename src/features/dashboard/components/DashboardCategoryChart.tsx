import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { TagIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { dashboardTicketsByCategoryQueryOption } from "../queries/dashboard.query";

export const DashboardCategoryChart = memo(function DashboardCategoryChart() {
    const { t } = useTranslation("dashboard");
    const { data, isLoading } = useQuery(dashboardTicketsByCategoryQueryOption());
    const categories = data?.data ?? [];

    const chartConfig = {
        total: { label: t("categoryChart.tickets"), color: "#8b5cf6" },
    } satisfies ChartConfig;

    const chartData = categories.map((c) => ({
        name: c.category_name,
        total: c.total,
    }));

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                        <TagIcon className="size-3.5 text-muted-foreground" />
                        {t("categoryChart.title")}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex h-48 items-end gap-4 px-4">
                        {[50, 80, 60, 90, 40].map((h, i) => (
                            <Skeleton key={i} className="flex-1" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                ) : chartData.length === 0 ? (
                    <p className="py-10 text-center text-sm text-muted-foreground">
                        {t("categoryChart.noData")}
                    </p>
                ) : (
                    <ChartContainer config={chartConfig} className="max-h-56 w-full">
                        <BarChart data={chartData} barSize={32}>
                            <CartesianGrid
                                horizontal
                                vertical={false}
                                strokeDasharray="4 4"
                                className="stroke-border/60"
                            />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 11 }}
                                interval={0}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                                tick={{ fontSize: 11 }}
                                width={24}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
});
