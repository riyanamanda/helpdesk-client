import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const authRoutes: RouteObject[] = [
    {
        path: ROUTES.LOGIN,
        lazy: async () => {
            const { LoginPage } = await import("./pages/LoginPage");
            return { Component: LoginPage };
        },
    },
];

export const profileRoutes: RouteObject[] = [
    {
        path: ROUTES.PROFILE,
        lazy: async () => {
            const { ProfilePage } = await import("./pages/ProfilePage");
            return { Component: ProfilePage };
        },
    },
];
