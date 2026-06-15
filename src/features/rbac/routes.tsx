import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const rbacRoutes: RouteObject[] = [
    {
        path: ROUTES.RBAC.INDEX,
        children: [
            {
                path: "",
                lazy: async () => {
                    const { RbacPage } = await import("./pages/RbacPage");
                    return { Component: RbacPage };
                },
            },
        ],
    },
];
