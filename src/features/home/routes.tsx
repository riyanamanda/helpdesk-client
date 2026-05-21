import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";
import { HomePage } from "./pages/HomePage";

export const homeRoutes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        element: <HomePage />,
    },
];
