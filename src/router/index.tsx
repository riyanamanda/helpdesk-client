import { authRoutes } from "@/features/auth";
import { categoryRoutes } from "@/features/category";
import { dashboardRoutes } from "@/features/dashboard";
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
        children: [...dashboardRoutes, ...categoryRoutes],
    },
    {
        path: "*",
        element: <div>Page Not Found</div>,
    },
];
