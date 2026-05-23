import type { TicketListParams } from "../types";

const TICKET_ROOT_KEY = ["ticket"] as const;

export const TICKET_QUERY_KEYS = {
    ROOT: TICKET_ROOT_KEY,
    LIST: (params: TicketListParams) => [...TICKET_ROOT_KEY, "list", params],
    GET: (id: number) => [...TICKET_ROOT_KEY, `${id}`],
} as const;
