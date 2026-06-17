import { PERMISSIONS } from "@/constants/permissions";
import { authRoutes, profileRoutes } from "@/features/auth/routes";
import { categoryRoutes } from "@/features/category/routes";
import { dashboardRoutes } from "@/features/dashboard/routes";
import { divisionRoutes } from "@/features/division/routes";
import { feedbackRoutes } from "@/features/feedback/routes";
import { homeRoutes } from "@/features/home/routes";
import { rbacRoutes } from "@/features/rbac/routes";
import { ticketRoutes } from "@/features/ticket/routes";
import { userRoutes } from "@/features/user/routes";
import { ErrorPage } from "@/pages/ErrorPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import type { RouteObject } from "react-router";
import { GuestRoutes } from "./GuestRoutes";
import { NavigationProgress } from "./NavigationProgress";
import { PermissionRoute } from "./PermissionRoute";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { satuSehatRoutes } from "@/features/satusehat/routes";

export const appRoutes: RouteObject[] = [
    {
        element: <NavigationProgress />,
        errorElement: <ErrorPage />,
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
                    {
                        element: <PermissionRoute permission={PERMISSIONS.TICKET.VIEW} />,
                        children: [...ticketRoutes],
                    },
                    {
                        element: <PermissionRoute permission={PERMISSIONS.FEEDBACK.VIEW} />,
                        children: [...feedbackRoutes],
                    },
                    ...profileRoutes,
                    {
                        element: <PermissionRoute permission={PERMISSIONS.CATEGORY.VIEW} />,
                        children: [...categoryRoutes],
                    },
                    {
                        element: <PermissionRoute permission={PERMISSIONS.DIVISION.VIEW} />,
                        children: [...divisionRoutes],
                    },
                    {
                        element: <PermissionRoute permission={PERMISSIONS.USER.VIEW} />,
                        children: [...userRoutes],
                    },
                    {
                        element: <PermissionRoute permission={PERMISSIONS.RBAC.VIEW} />,
                        children: [...rbacRoutes],
                    },
                    {
                        children: [...satuSehatRoutes],
                    },
                ],
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
];
