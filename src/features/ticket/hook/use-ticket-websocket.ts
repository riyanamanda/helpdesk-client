import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { websocket } from "@/lib/websocket";
import { TICKET_QUERY_KEYS } from "../queries";

export function useTicketWebSocket() {
    const queryClient = useQueryClient();

    useEffect(() => {
        const unsubscribe = websocket.on("ticket.created", () => {
            queryClient.invalidateQueries({
                queryKey: TICKET_QUERY_KEYS.ROOT,
            });
        });

        return unsubscribe;
    }, [queryClient]);
}
