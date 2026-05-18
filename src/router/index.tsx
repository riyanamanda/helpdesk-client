import { authRoutes } from "@/features/auth";
import { dashboardRoutes } from "@/features/dashboard/routes";
import type { RouteObject } from "react-router";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const appRoutes: RouteObject[] = [
    {
        element: <PublicRoutes />,
        children: [...authRoutes],
    },
    {
        element: <ProtectedRoutes />,
        children: [...dashboardRoutes],
    },
    {
        path: "*",
        element: <div>Page Not Found</div>,
    },
];
