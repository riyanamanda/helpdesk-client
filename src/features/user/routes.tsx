import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";
import { CreateUserPage } from "./pages/CreateUserPage";
import { UserPage } from "./pages/UserPage";

export const userRoutes: RouteObject[] = [
    {
        path: ROUTES.USER.INDEX,
        children: [
            {
                path: "",
                element: <UserPage />,
            },
            {
                path: ROUTES.USER.CREATE,
                element: <CreateUserPage />,
            },
        ],
    },
];
