import { PageLayout } from "@/components/layout/PageLayout";
import { useState } from "react";
import { DashboardAgentWorkload } from "../components/DashboardAgentWorkload";
import { DashboardPriorityChart } from "../components/DashboardPriorityChart";
import { DashboardRecentTickets } from "../components/DashboardRecentTickets";
import { DashboardStatCards } from "../components/DashboardStatCards";
import { DashboardStatusChart } from "../components/DashboardStatusChart";
import { TicketTrendChart } from "../components/TicketTrendChart";

export function DashboardPage() {
    const [trendYear, setTrendYear] = useState(new Date().getFullYear());

    return (
        <PageLayout>
            <PageLayout.Content>
                <DashboardStatCards />

                <div className="grid gap-4 lg:grid-cols-2">
                    <DashboardStatusChart />
                    <DashboardPriorityChart />
                </div>

                <DashboardAgentWorkload />

                <TicketTrendChart year={trendYear} onYearChange={setTrendYear} />

                <DashboardRecentTickets />
            </PageLayout.Content>
        </PageLayout>
    );
}
