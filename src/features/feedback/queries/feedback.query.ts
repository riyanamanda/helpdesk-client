import { queryOptions } from "@tanstack/react-query";
import { feedbackService } from "../service/feedbackService";
import type { FeedbackListParams } from "../types";
import { FEEDBACK_QUERY_KEYS } from "./queryKeys";

export function listFeedbackQueryOption(params: FeedbackListParams = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: FEEDBACK_QUERY_KEYS.LIST(params),
        queryFn: () => feedbackService.list(params),
    });
}

export function listAdminFeedbackQueryOption(params: FeedbackListParams = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: FEEDBACK_QUERY_KEYS.ADMIN_LIST(params),
        queryFn: () => feedbackService.adminList(params),
    });
}

export function getFeedbackQueryOption(id: number) {
    return queryOptions({
        queryKey: FEEDBACK_QUERY_KEYS.GET(id),
        queryFn: () => feedbackService.get(id),
    });
}
