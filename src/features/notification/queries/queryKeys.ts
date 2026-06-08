const NOTIFICATION_ROOT_KEY = ["notification"] as const;

export const NOTIFICATION_QUERY_KEYS = {
    ROOT: NOTIFICATION_ROOT_KEY,
    LIST: [...NOTIFICATION_ROOT_KEY, "list"] as const,
    UNREAD_COUNT: [...NOTIFICATION_ROOT_KEY, "unread-count"] as const,
} as const;
