import { handleApiError } from "@/lib/handle-form-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PATIENT_QUERY_KEYS } from "../queries";
import { patientService } from "../service/patientService";

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
