import { queryOptions } from "@tanstack/react-query";
import { ticketService } from "../service/ticketService";
import type { TicketListParams } from "../types";
import { TICKET_QUERY_KEYS } from "./queryKeys";

export function listTicketQueryOption(params: TicketListParams = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: TICKET_QUERY_KEYS.LIST(params),
        queryFn: ({ signal }) => ticketService.list(params, signal),
    });
}

export function getTicketQueryOption(id: number) {
    return queryOptions({
        queryKey: TICKET_QUERY_KEYS.GET(id),
        queryFn: ({ signal }) => ticketService.get(id, signal),
    });
}
