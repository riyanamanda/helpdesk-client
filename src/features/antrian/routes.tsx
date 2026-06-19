import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const antrianRoutes: RouteObject[] = [
    {
        path: ROUTES.ANTRIAN.INDEX,
        lazy: async () => {
            const { AntrianPage } = await import("./pages/AntrianPage");
            return { Component: AntrianPage };
        },
    },
];
