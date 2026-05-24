import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const homeRoutes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        lazy: async () => {
            const { HomePage } = await import("./pages/HomePage");
            return { Component: HomePage };
        },
    },
];
