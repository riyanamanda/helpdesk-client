import { useEffect, type ReactNode } from "react";
import { websocket } from "@/lib/websocket";

type WebSocketProviderProps = {
    children: ReactNode;
};

export function WebSocketProvider({ children }: WebSocketProviderProps) {
    useEffect(() => {
        websocket.connect();

        return () => {
            websocket.disconnect();
        };
    }, []);

    return children;
}
