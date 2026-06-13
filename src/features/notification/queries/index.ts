import { queryOptions, useQuery } from "@tanstack/react-query";
import { notificationService } from "../service/notificationService";
import { NOTIFICATION_QUERY_KEYS } from "./queryKeys";

export function notificationsQueryOption() {
    return queryOptions({
        queryKey: NOTIFICATION_QUERY_KEYS.LIST,
        queryFn: notificationService.list,
        refetchInterval: 30_000,
        select: (data) => data.data,
    });
}

export function unreadCountQueryOption() {
    return queryOptions({
        queryKey: NOTIFICATION_QUERY_KEYS.UNREAD_COUNT,
        queryFn: notificationService.unreadCount,
        refetchInterval: 30_000,
        select: (data) => data.data.count,
    });
}

export function useNotificationsQuery() {
    return useQuery(notificationsQueryOption());
}

export function useUnreadCountQuery() {
    return useQuery(unreadCountQueryOption());
}

export * from "./queryKeys";
