import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const dashboardRoutes: RouteObject[] = [
    {
        path: ROUTES.DASHBOARD,
        lazy: async () => {
            const { DashboardPage } = await import("./pages/DashboardPage");
            return { Component: DashboardPage };
        },
    },
];
