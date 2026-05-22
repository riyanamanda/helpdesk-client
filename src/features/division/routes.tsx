import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";
import { DivisionPage } from "./pages/DivisionPage";
import { DivisionCreatePage } from "./pages/CreateDivisionPage";
import { EditDivisionPage } from "./pages/EditDivisionPage";

export const divisionRoutes: RouteObject[] = [
    {
        path: ROUTES.DIVISION.INDEX,
        children: [
            {
                path: "",
                element: <DivisionPage />,
            },
            {
                path: ROUTES.DIVISION.CREATE,
                element: <DivisionCreatePage />,
            },
            {
                path: ROUTES.DIVISION.EDIT,
                element: <EditDivisionPage />,
            },
        ],
    },
];
