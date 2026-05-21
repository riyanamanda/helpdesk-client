import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";
import { LoginPage } from "./pages/LoginPage";

export const authRoutes: RouteObject[] = [
    {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
    },
];
