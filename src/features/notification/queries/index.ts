import { useQuery } from "@tanstack/react-query";
import { notificationService } from "../service/notificationService";
import { NOTIFICATION_QUERY_KEYS } from "./queryKeys";

export function useNotificationsQuery() {
    return useQuery({
        queryKey: NOTIFICATION_QUERY_KEYS.LIST,
        queryFn: notificationService.list,
        refetchInterval: 30_000,
        select: (data) => data.data,
    });
}

export function useUnreadCountQuery() {
    return useQuery({
        queryKey: NOTIFICATION_QUERY_KEYS.UNREAD_COUNT,
        queryFn: notificationService.unreadCount,
        refetchInterval: 30_000,
        select: (data) => data.data.count,
    });
}

export * from "./queryKeys";
