import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const categoryRoutes: RouteObject[] = [
    {
        path: ROUTES.CATEGORY.INDEX,
        children: [
            {
                path: "",
                lazy: async () => {
                    const { CategoryPage } = await import("./pages/CategoryPage");
                    return { Component: CategoryPage };
                },
            },
            {
                path: ROUTES.CATEGORY.CREATE,
                lazy: async () => {
                    const { CategoryCreatePage } = await import("./pages/CreateCategoryPage");
                    return { Component: CategoryCreatePage };
                },
            },
            {
                path: ROUTES.CATEGORY.EDIT,
                lazy: async () => {
                    const { EditCategoryPage } = await import("./pages/EditCategoryPage");
                    return { Component: EditCategoryPage };
                },
            },
        ],
    },
];
