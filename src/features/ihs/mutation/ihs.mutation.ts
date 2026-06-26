import { handleApiError } from "@/lib/handle-form-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PATIENT_QUERY_KEYS } from "../queries";
import { patientService } from "../service/patientService";
import { toast } from "sonner";

export function useCreateIhsMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (norm: string) => patientService.create(norm),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: PATIENT_QUERY_KEYS.ROOT });
        },
        onError: (error) => handleApiError(error),
    });
}

export function useSendIhsMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => patientService.sendIhs(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: PATIENT_QUERY_KEYS.ROOT });
        },
        onError: () => {
            toast.error("Send IHS failed");
        },
    });
}
