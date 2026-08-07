import { useMutation } from "@tanstack/react-query";
import { feedbackService } from "../service/feedbackService";
import type { FeedbackCreateFormData, FeedbackUpdateStatusFormData } from "../types";

export function useCreateFeedbackMutation() {
    return useMutation({
        mutationFn: (payload: FeedbackCreateFormData) => feedbackService.create(payload),
    });
}

export function useUpdateFeedbackStatusMutation() {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: FeedbackUpdateStatusFormData }) =>
            feedbackService.updateStatus(id, payload),
    });
}

export function useDeleteFeedbackMutation() {
    return useMutation({
        mutationFn: (id: number) => feedbackService.delete(id),
    });
}
