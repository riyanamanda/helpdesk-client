export type WebSocketMessage<T = unknown> = {
    type: string;
    data: T;
};

type Handler<T = unknown> = (data: T) => void;

export type WebSocketStatus = "connecting" | "connected" | "disconnected";

type StatusListener = (status: WebSocketStatus) => void;

class WebSocketClient {
    private ws: WebSocket | null = null;
    private handlers = new Map<string, Set<Handler>>();
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    private intentionalClose = false;
    private status: WebSocketStatus = "disconnected";
    private statusListeners = new Set<StatusListener>();

    private setStatus(status: WebSocketStatus) {
        if (this.status === status) {
            return;
        }

        this.status = status;
        this.statusListeners.forEach((listener) => listener(status));
    }

    getStatus() {
        return this.status;
    }

    subscribeStatus(listener: StatusListener) {
        this.statusListeners.add(listener);

        return () => {
            this.statusListeners.delete(listener);
        };
    }

    connect() {
        this.intentionalClose = false;

        if (
            this.ws?.readyState === WebSocket.OPEN ||
            this.ws?.readyState === WebSocket.CONNECTING
        ) {
            return;
        }

        const base =
            import.meta.env.VITE_WS_BASE_URL ||
            `${location.protocol === "https:" ? "wss:" : "ws:"}//${location.host}`;
        const url = `${base}/api/v1/ws`;

        this.ws = new WebSocket(url);
        this.setStatus("connecting");

        this.ws.onopen = () => {
            if (import.meta.env.DEV) console.log("[WS] connected");
            this.setStatus("connected");
        };

        this.ws.onmessage = (event) => {
            try {
                const message: WebSocketMessage = JSON.parse(event.data);

                if (import.meta.env.DEV) console.log("[WS] received:", message);

                const handlers = this.handlers.get(message.type);

                handlers?.forEach((handler) => {
                    handler(message.data);
                });
            } catch (error) {
                console.error("[WS] invalid message:", error);
            }
        };

        this.ws.onclose = () => {
            if (import.meta.env.DEV) console.log("[WS] disconnected");
            this.setStatus("disconnected");

            if (this.intentionalClose) {
                return;
            }

            this.reconnectTimer = setTimeout(() => {
                this.connect();
            }, 3000);
        };

        this.ws.onerror = (error) => {
            console.error("[WS] error:", error);
        };
    }

    disconnect() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }

        if (!this.ws) {
            return;
        }

        this.intentionalClose = true;
        this.setStatus("disconnected");

        const socket = this.ws;

        if (socket.readyState === WebSocket.CONNECTING) {
            socket.onopen = () => socket.close();
        } else {
            socket.close();
        }

        this.ws = null;
    }

    on<T>(event: string, handler: Handler<T>) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set());
        }

        this.handlers.get(event)!.add(handler as Handler);

        return () => {
            this.handlers.get(event)?.delete(handler as Handler);
        };
    }
}

export const websocket = new WebSocketClient();
