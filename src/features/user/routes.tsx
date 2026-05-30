import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const userRoutes: RouteObject[] = [
    {
        path: ROUTES.USER.INDEX,
        children: [
            {
                path: "",
                lazy: async () => {
                    const { UserPage } = await import("./pages/UserPage");
                    return { Component: UserPage };
                },
            },
            {
                path: ROUTES.USER.CREATE,
                lazy: async () => {
                    const { CreateUserPage } = await import("./pages/CreateUserPage");
                    return { Component: CreateUserPage };
                },
            },
            {
                path: ROUTES.USER.EDIT,
                lazy: async () => {
                    const { EditUserPage } = await import("./pages/EditUserPage");
                    return { Component: EditUserPage };
                },
            },
        ],
    },
];
