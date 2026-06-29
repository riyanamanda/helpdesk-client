import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { enUS, id as idLocale } from "date-fns/locale";
import { BellIcon, CheckCheckIcon, LoaderCircleIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useMarkAllAsReadMutation, useMarkAsReadMutation } from "../mutation/notification.mutation";
import {
    useNotificationsQueryOption,
    useUnreadCountQueryOption,
} from "../queries/notification.query";
import type { Notification } from "../types";

export function NotificationBell() {
    const { t, i18n } = useTranslation("notification");
    const navigate = useNavigate();
    const { data: notifications = [], isLoading } = useQuery(useNotificationsQueryOption());
    const { data: unreadCount = 0 } = useQuery(useUnreadCountQueryOption());
    const { mutate: markAsRead } = useMarkAsReadMutation();
    const { mutate: markAllAsRead, isPending: isMarkingAll } = useMarkAllAsReadMutation();

    const dateFnsLocale = i18n.language === "id" ? idLocale : enUS;

    function getNotificationMessage(notification: Notification) {
        const baseKey = `types.${notification.type}`;
        const key = notification.metadata.status
            ? `${baseKey}.${notification.metadata.status}`
            : baseKey;
        return t(key, { actor_name: notification.metadata.actor_name });
    }

    function handleItemClick(notification: Notification) {
        if (!notification.is_read) {
            markAsRead(notification.id);
        }
        if (notification.reference_type === "TICKET") {
            navigate(`/ticket/${notification.reference_id}`);
        } else if (notification.reference_type === "FEEDBACK") {
            navigate(`/feedback/${notification.reference_id}`);
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label={t("title")}>
                    <BellIcon className="size-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold">{t("title")}</h3>
                        {unreadCount > 0 && (
                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                {t("unreadCount", { count: unreadCount })}
                            </span>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1.5 text-xs"
                            disabled={isMarkingAll}
                            onClick={() => markAllAsRead()}
                        >
                            <CheckCheckIcon className="size-3.5" />
                            {t("markAllRead")}
                        </Button>
                    )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <LoaderCircleIcon className="size-5 animate-spin text-muted-foreground" />
                        </div>
                    ) : notifications.length === 0 ? (
                        <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                            {t("empty")}
                        </p>
                    ) : (
                        notifications.map((notification) => (
                            <button
                                key={notification.id}
                                onClick={() => handleItemClick(notification)}
                                className={cn(
                                    "flex w-full items-start gap-3 border-b px-4 py-3 text-left transition-colors last:border-0 hover:bg-muted/50",
                                    !notification.is_read && "bg-muted/30"
                                )}
                            >
                                <span
                                    className={cn(
                                        "mt-1.5 size-2 shrink-0 rounded-full",
                                        notification.is_read ? "bg-transparent" : "bg-blue-500"
                                    )}
                                />
                                <div className="min-w-0 flex-1 space-y-0.5">
                                    <p className="text-sm leading-snug">
                                        {getNotificationMessage(notification)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(notification.created_at), {
                                            addSuffix: true,
                                            locale: dateFnsLocale,
                                        })}
                                    </p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
