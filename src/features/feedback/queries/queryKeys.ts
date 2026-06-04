import type { FeedbackListParams } from "../types";

const FEEDBACK_ROOT_KEY = ["feedback"] as const;

export const FEEDBACK_QUERY_KEYS = {
    ROOT: FEEDBACK_ROOT_KEY,
    LIST: (params: FeedbackListParams) => [...FEEDBACK_ROOT_KEY, "list", params],
    ADMIN_LIST: (params: FeedbackListParams) => [...FEEDBACK_ROOT_KEY, "admin", "list", params],
    GET: (id: number) => [...FEEDBACK_ROOT_KEY, `${id}`],
} as const;
