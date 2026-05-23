import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";
import { CreateTicketPage } from "./pages/CreateTicketPage";
import { TicketDetailPage } from "./pages/TicketDetailPage";
import { TicketPage } from "./pages/TicketPage";

export const ticketRoutes: RouteObject[] = [
    {
        path: ROUTES.TICKET.INDEX,
        children: [
            {
                path: "",
                element: <TicketPage />,
            },
            {
                path: ROUTES.TICKET.CREATE,
                element: <CreateTicketPage />,
            },
            {
                path: ROUTES.TICKET.DETAIL,
                element: <TicketDetailPage />,
            },
        ],
    },
];
