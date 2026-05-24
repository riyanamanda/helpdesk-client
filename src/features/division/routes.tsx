import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const divisionRoutes: RouteObject[] = [
    {
        path: ROUTES.DIVISION.INDEX,
        children: [
            {
                path: "",
                lazy: async () => {
                    const { DivisionPage } = await import("./pages/DivisionPage");
                    return { Component: DivisionPage };
                },
            },
            {
                path: ROUTES.DIVISION.CREATE,
                lazy: async () => {
                    const { DivisionCreatePage } = await import("./pages/CreateDivisionPage");
                    return { Component: DivisionCreatePage };
                },
            },
            {
                path: ROUTES.DIVISION.EDIT,
                lazy: async () => {
                    const { EditDivisionPage } = await import("./pages/EditDivisionPage");
                    return { Component: EditDivisionPage };
                },
            },
        ],
    },
];
