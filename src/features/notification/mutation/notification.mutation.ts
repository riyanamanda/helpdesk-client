import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NOTIFICATION_QUERY_KEYS } from "../queries";
import { notificationService } from "../service/notificationService";

function invalidateNotifications(queryClient: ReturnType<typeof useQueryClient>) {
    queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.LIST });
    queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.UNREAD_COUNT });
}

export function useMarkAsReadMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => notificationService.markAsRead(id),
        onSuccess: () => invalidateNotifications(queryClient),
    });
}

export function useMarkAllAsReadMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: notificationService.markAllAsRead,
        onSuccess: () => invalidateNotifications(queryClient),
    });
}
