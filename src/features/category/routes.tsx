import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";
import { CategoryPage } from "./pages/CategoryPage";
import { CategoryCreatePage } from "./pages/CreateCategoryPage";
import { EditCategoryPage } from "./pages/EditCategoryPage";

export const categoryRoutes: RouteObject[] = [
    {
        path: ROUTES.CATEGORY.INDEX,
        children: [
            {
                path: "",
                element: <CategoryPage />,
            },
            {
                path: ROUTES.CATEGORY.CREATE,
                element: <CategoryCreatePage />,
            },
            {
                path: ROUTES.CATEGORY.EDIT,
                element: <EditCategoryPage />,
            },
        ],
    },
];
