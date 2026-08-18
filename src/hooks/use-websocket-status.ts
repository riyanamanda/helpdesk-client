import { useSyncExternalStore } from "react";

import { websocket } from "@/lib/websocket";

export function useWebSocketStatus() {
    return useSyncExternalStore(
        (listener) => websocket.subscribeStatus(listener),
        () => websocket.getStatus()
    );
}
