import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ChartLineIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts";
import { dashboardMonthlyTrendQueryOption } from "../queries/dashboard.query";

interface TicketTrendChartProps {
    year: number;
    onYearChange: (year: number) => void;
}

const YEAR_RANGE = 4;

function buildYearOptions() {
    const current = new Date().getFullYear();
    return Array.from({ length: YEAR_RANGE }, (_, i) => current - i);
}

export function TicketTrendChart({ year, onYearChange }: TicketTrendChartProps) {
    const { t } = useTranslation("dashboard");

    const { data, isLoading } = useQuery(dashboardMonthlyTrendQueryOption(year));
    const rawTrend = data?.data ?? [];

    const SHORT_MONTHS = [
        t("trend.months.jan"),
        t("trend.months.feb"),
        t("trend.months.mar"),
        t("trend.months.apr"),
        t("trend.months.may"),
        t("trend.months.jun"),
        t("trend.months.jul"),
        t("trend.months.aug"),
        t("trend.months.sep"),
        t("trend.months.oct"),
        t("trend.months.nov"),
        t("trend.months.dec"),
    ];

    const chartData = Array.from({ length: 12 }, (_, i) => {
        const found = rawTrend.find((d) => d.month === i + 1);
        return {
            month: SHORT_MONTHS[i],
            submitted: found?.submitted ?? 0,
            resolved: found?.resolved ?? 0,
            closed: found?.closed ?? 0,
        };
    });

    const chartConfig: ChartConfig = {
        submitted: { label: t("trend.submitted"), color: "#3b82f6" },
        resolved: { label: t("trend.resolved"), color: "#22c55e" },
        closed: { label: t("trend.closed"), color: "#94a3b8" },
    };

    const yearOptions = buildYearOptions();

    const legendItems = [
        { key: "submitted", color: "#3b82f6" },
        { key: "resolved", color: "#22c55e" },
        { key: "closed", color: "#94a3b8" },
    ] as const;

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                        <ChartLineIcon className="size-3.5 text-muted-foreground" />
                        {t("trend.title")}
                        <span className="mx-0.5 opacity-40">·</span>
                        <span className="text-xs font-normal text-muted-foreground">{year}</span>
                    </span>
                    <Select value={String(year)} onValueChange={(v) => onYearChange(Number(v))}>
                        <SelectTrigger className="h-7 w-24 text-xs font-normal">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {yearOptions.map((y) => (
                                <SelectItem key={y} value={String(y)}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {isLoading ? (
                    <Skeleton className="h-56 w-full" />
                ) : (
                    <ChartContainer config={chartConfig} className="max-h-64 w-full">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="gradSubmitted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gradResolved" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gradClosed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                horizontal
                                vertical={false}
                                strokeDasharray="4 4"
                                className="stroke-border/60"
                            />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 11 }}
                                dy={6}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                                tick={{ fontSize: 11 }}
                                width={24}
                            />
                            <ChartTooltip
                                content={<ChartTooltipContent />}
                                cursor={{
                                    stroke: "var(--border)",
                                    strokeWidth: 1,
                                    strokeDasharray: "4 4",
                                }}
                            />
                            <Line
                                type="linear"
                                dataKey="submitted"
                                stroke="var(--color-submitted)"
                                strokeWidth={2}
                                fill="url(#gradSubmitted)"
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--background)" }}
                            />
                            <Line
                                type="linear"
                                dataKey="resolved"
                                stroke="var(--color-resolved)"
                                strokeWidth={2}
                                fill="url(#gradResolved)"
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--background)" }}
                            />
                            <Line
                                type="linear"
                                dataKey="closed"
                                stroke="var(--color-closed)"
                                strokeWidth={2}
                                fill="url(#gradClosed)"
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--background)" }}
                            />
                        </AreaChart>
                    </ChartContainer>
                )}

                <div className="flex items-center justify-center gap-4">
                    {legendItems.map(({ key, color }) => (
                        <span
                            key={key}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground"
                        >
                            <span
                                className="inline-block size-2 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                            <span className="font-medium text-foreground/60">
                                {t(`trend.${key}`)}
                            </span>
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
