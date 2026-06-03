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
    {
        path: ROUTES.PROFILE_UPDATE_PASSWORD,
        lazy: async () => {
            const { UpdatePasswordPage } = await import("./pages/UpdatePasswordPage");
            return { Component: UpdatePasswordPage };
        },
    },
];
