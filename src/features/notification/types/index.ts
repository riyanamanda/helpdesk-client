export type NotificationType =
    | "NEW_TICKET"
    | "TICKET_ASSIGNED"
    | "TICKET_CLOSED"
    | "FEEDBACK_STATUS_UPDATED";
export type NotificationReferenceType = "TICKET" | "FEEDBACK";

export interface NotificationMetadata {
    actor_name: string;
    status?: string;
}

export interface Notification {
    id: number;
    user_id: string;
    type: NotificationType;
    reference_type: NotificationReferenceType;
    reference_id: number;
    metadata: NotificationMetadata;
    is_read: boolean;
    read_at: string | null;
    created_at: string;
}
