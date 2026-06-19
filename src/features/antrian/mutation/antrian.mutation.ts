import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { antrianService } from "../service/antrianService";
import { ANTRIAN_QUERY_KEYS } from "../queries/queryKeys";

export function useCheckInAntrian() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (kodeBooking: number) => antrianService.checkIn(kodeBooking),
        onSuccess: () => {
            toast.success(t("toast.success"), {
                description: t("antrian:checkin.success"),
            });
            queryClient.invalidateQueries({ queryKey: ANTRIAN_QUERY_KEYS.ROOT });
        },
        onError: () => {
            toast.error(t("toast.operationFailed"), {
                description: t("antrian:checkin.error"),
            });
        },
    });
}
