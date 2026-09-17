import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import type { TFunction } from "i18next";
import { LogInIcon } from "lucide-react";
import { useCheckInAntrian } from "../mutation/antrian.mutation";
import type { Antrian } from "../types";

export function CheckInButton({ antrian, t }: { antrian: Antrian; t: TFunction<"antrian"> }) {
    const { mutate, isPending } = useCheckInAntrian();
    const canCheckIn = antrian.status === 99 && !antrian.waktu_check_in;

    if (!canCheckIn) return <span>-</span>;

    const handleCheckIn = () => {
        mutate(antrian.kode_booking);
    };

    return (
        <ConfirmDialog
            title={t("checkin.dialog.title")}
            description={t("checkin.dialog.description")}
            confirmLabel={t("checkin.dialog.confirm")}
            pendingLabel={t("checkin.loading")}
            icon={<LogInIcon />}
            variant="default"
            isPending={isPending}
            onConfirm={handleCheckIn}
            trigger={
                <Button size="sm" variant="outline" disabled={isPending}>
                    {isPending ? t("checkin.loading") : t("checkin.button")}
                </Button>
            }
        />
    );
}
