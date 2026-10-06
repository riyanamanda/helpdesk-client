import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const homeRoutes: RouteObject[] = [
    {
        lazy: async () => {
            const { LandingLayout } = await import("./components/LandingLayout");
            return { Component: LandingLayout };
        },
        children: [
            {
                path: ROUTES.HOME,
                lazy: async () => {
                    const { HomePage } = await import("./pages/HomePage");
                    return { Component: HomePage };
                },
            },
            {
                path: ROUTES.TEAM,
                lazy: async () => {
                    const { TeamPage } = await import("./pages/TeamPage");
                    return { Component: TeamPage };
                },
            },
        ],
    },
];
