import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { useWebSocketStatus } from "@/hooks/use-websocket-status";
import { Badge } from "./ui/badge";

const STATUS_CONFIG = {
    connected: { variant: "success", dot: "bg-emerald-500" },
    connecting: { variant: "secondary", dot: "bg-amber-500 animate-pulse" },
    disconnected: { variant: "destructive", dot: "bg-red-500" },
} as const;

export function WebSocketStatus() {
    const { t } = useTranslation("common");
    const status = useWebSocketStatus();
    const config = STATUS_CONFIG[status];

    return (
        <Badge variant={config.variant} className="gap-1.5">
            <span className={cn("size-1.5 rounded-full", config.dot)} />
            {t(`status.${status}`)}
        </Badge>
    );
}
