import { authRoutes, profileRoutes } from "@/features/auth/routes";
import { categoryRoutes } from "@/features/category/routes";
import { dashboardRoutes } from "@/features/dashboard/routes";
import { divisionRoutes } from "@/features/division/routes";
import { ticketRoutes } from "@/features/ticket/routes";
import { userRoutes } from "@/features/user/routes";
import { homeRoutes } from "@/features/home/routes";
import type { RouteObject } from "react-router";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { GuestRoutes } from "./GuestRoutes";
import { NavigationProgress } from "./NavigationProgress";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const appRoutes: RouteObject[] = [
    {
        element: <NavigationProgress />,
        children: [
            ...homeRoutes,
            {
                element: <GuestRoutes />,
                children: [...authRoutes],
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    ...dashboardRoutes,
                    ...categoryRoutes,
                    ...divisionRoutes,
                    ...userRoutes,
                    ...ticketRoutes,
                    ...profileRoutes,
                ],
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
];
