import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const ihsRoutes: RouteObject[] = [
    {
        path: ROUTES.IHS.INDEX,
        children: [
            {
                path: "",
                lazy: async () => {
                    const { PatientPage } = await import("./pages/PatientPage");
                    return { Component: PatientPage };
                },
            },
            {
                path: ROUTES.IHS.DETAIL,
                lazy: async () => {
                    const { DetailPatientPage } = await import("./pages/PatientDetailPage");
                    return { Component: DetailPatientPage };
                },
            },
        ],
    },
];
