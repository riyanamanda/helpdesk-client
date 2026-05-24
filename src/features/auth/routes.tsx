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
