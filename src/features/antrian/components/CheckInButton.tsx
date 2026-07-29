import { Button } from "@/components/ui/button";
import type { TFunction } from "i18next";
import type { Antrian } from "../types";
import { useCheckInAntrian } from "../mutation/antrian.mutation";

export function CheckInButton({ antrian, t }: { antrian: Antrian; t: TFunction<"antrian"> }) {
    const { mutate, isPending } = useCheckInAntrian();
    const canCheckIn = antrian.status === 99 && !antrian.waktu_check_in;

    if (!canCheckIn) return <span>-</span>;

    return (
        <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={() => mutate(antrian.kode_booking)}
        >
            {isPending ? t("checkin.loading") : t("checkin.button")}
        </Button>
    );
}
