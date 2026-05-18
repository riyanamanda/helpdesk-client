import { dashboardRoutes } from "@/features/dashboard/routes";
import type { RouteObject } from "react-router";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const appRoutes: RouteObject[] = [
    {
        element: <PublicRoutes />,
        children: [...dashboardRoutes],
    },
    {
        element: <ProtectedRoutes />,
        children: [],
    },
    {
        path: "*",
        element: <div>Page Not Found</div>,
    },
];
