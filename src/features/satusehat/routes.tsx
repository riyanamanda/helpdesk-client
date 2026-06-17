import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const satuSehatRoutes: RouteObject[] = [
    {
        path: ROUTES.SATUSEHAT.INDEX,
        children: [
            {
                path: "",
                lazy: async () => {
                    const { SatuSehatPage } = await import("./pages/SatuSehatPage");
                    return { Component: SatuSehatPage };
                },
            },
        ],
    },
];
