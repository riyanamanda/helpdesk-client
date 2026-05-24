import { ROUTES } from "@/constants";
import type { RouteObject } from "react-router";

export const ticketRoutes: RouteObject[] = [
    {
        path: ROUTES.TICKET.INDEX,
        children: [
            {
                path: "",
                lazy: async () => {
                    const { TicketPage } = await import("./pages/TicketPage");
                    return { Component: TicketPage };
                },
            },
            {
                path: ROUTES.TICKET.CREATE,
                lazy: async () => {
                    const { CreateTicketPage } = await import("./pages/CreateTicketPage");
                    return { Component: CreateTicketPage };
                },
            },
            {
                path: ROUTES.TICKET.DETAIL,
                lazy: async () => {
                    const { TicketDetailPage } = await import("./pages/TicketDetailPage");
                    return { Component: TicketDetailPage };
                },
            },
        ],
    },
];
