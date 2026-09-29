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
    {
        path: ROUTES.FORGOT_PASSWORD,
        lazy: async () => {
            const { ForgotPassword } = await import("./pages/ForgotPassword");
            return { Component: ForgotPassword };
        },
    },
    {
        path: ROUTES.RESET_PASSWORD,
        lazy: async () => {
            const { ResetPassword } = await import("./pages/ResetPassword");
            return { Component: ResetPassword };
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
