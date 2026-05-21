import type { RouteObject } from "react-router";
import { DashboardPage } from "./pages/DashboardPage";
import { ROUTES } from "@/constants";

export const dashboardRoutes: RouteObject[] = [
    {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
    },
];
