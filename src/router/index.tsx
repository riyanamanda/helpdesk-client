import { authRoutes } from "@/features/auth";
import { dashboardRoutes } from "@/features/dashboard/routes";
import { homeRoutes } from "@/features/home/routes";
import type { RouteObject } from "react-router";
import { GuestRoutes } from "./GuestRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const appRoutes: RouteObject[] = [
    ...homeRoutes,
    {
        element: <GuestRoutes />,
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
