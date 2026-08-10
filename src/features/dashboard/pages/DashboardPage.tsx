import { PageLayout } from "@/components/layout/PageLayout";
import { useState } from "react";
import { DashboardAgentWorkload } from "../components/DashboardAgentWorkload";
import { DashboardCategoryChart } from "../components/DashboardCategoryChart";
import { DashboardPriorityChart } from "../components/DashboardPriorityChart";
import { DashboardStatCards } from "../components/DashboardStatCards";
import { TicketTrendChart } from "../components/TicketTrendChart";

export function DashboardPage() {
    const [trendYear, setTrendYear] = useState(new Date().getFullYear());

    return (
        <PageLayout>
            <PageLayout.Content>
                <DashboardStatCards />

                <div className="grid gap-4 lg:grid-cols-2">
                    <DashboardPriorityChart />
                    <DashboardCategoryChart />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <TicketTrendChart year={trendYear} onYearChange={setTrendYear} />
                    <DashboardAgentWorkload />
                </div>
            </PageLayout.Content>
        </PageLayout>
    );
}
