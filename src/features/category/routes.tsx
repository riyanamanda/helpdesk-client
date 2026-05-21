import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";
import { CategoryPage } from "./pages/CategoryPage";

export const categoryRoutes: RouteObject[] = [
    {
        path: ROUTES.CATEGORY.INDEX,
        children: [
            {
                path: "",
                element: <CategoryPage />,
            },
        ],
    },
];
