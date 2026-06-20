import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { handleApiError } from "@/lib/handle-form-error";
import { patientService } from "../service/patientService";
import { PATIENT_QUERY_KEYS } from "../queries";

export function useCreateIhsMutation() {
    const { t } = useTranslation("ihs");
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (norm: string) => patientService.create(norm),
        onSuccess: async () => {
            toast.success(t("common:toast.success"), {
                description: t("detail.createDialog.success"),
            });
            await queryClient.invalidateQueries({ queryKey: PATIENT_QUERY_KEYS.ROOT });
        },
        onError: (error) => handleApiError(error),
    });
}
