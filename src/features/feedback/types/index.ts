export type FeedbackType = "FEATURE_REQUEST" | "IMPROVEMENT" | "BUG_REPORT";
export type FeedbackStatus = "OPEN" | "IN_REVIEW" | "ACCEPTED" | "REJECTED" | "DELIVERED";
export type FeedbackSortBy = "created_at" | "updated_at" | "status" | "type";
export type SortType = "ASC" | "DESC";

export interface FeedbackUser {
    id: string;
    name: string;
}

export interface Feedback {
    id: number;
    title: string;
    description: string;
    type: FeedbackType;
    status: FeedbackStatus;
    created_by: FeedbackUser;
    reviewed_by: FeedbackUser | null;
    reviewed_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface FeedbackCreateFormData {
    title: string;
    description: string;
    type: FeedbackType;
}

export interface FeedbackUpdateStatusFormData {
    status: Exclude<FeedbackStatus, "OPEN">;
}

export interface FeedbackListParams {
    page?: number;
    limit?: number;
    sort_by?: FeedbackSortBy;
    sort_type?: SortType;
    type?: FeedbackType;
    status?: FeedbackStatus;
}
