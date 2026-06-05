import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DASHBOARD_QUERY_KEYS } from "@/features/dashboard/queries/dashboard.query";
import { handleApiError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import { FlagIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useSetPriorityMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import type { TicketPriority } from "../types";

interface SetPrioritySheetProps {
    ticketId: number;
    currentPriority: TicketPriority | null;
}

export function SetPrioritySheet({ ticketId, currentPriority }: SetPrioritySheetProps) {
    const { t } = useTranslation("ticket");
    const queryClient = useQueryClient();
    const { mutate, isPending } = useSetPriorityMutation();

    const PRIORITIES: { label: string; value: TicketPriority }[] = [
        { label: t("priority.LOW"), value: "LOW" },
        { label: t("priority.MEDIUM"), value: "MEDIUM" },
        { label: t("priority.HIGH"), value: "HIGH" },
        { label: t("priority.URGENT"), value: "URGENT" },
    ];

    const handleSelect = (priority: TicketPriority) => {
        if (priority === currentPriority) return;
        mutate(
            { id: ticketId, payload: { priority } },
            {
                onSuccess: async () => {
                    toast.success(t("common:toast.success"), {
                        description: t("setPriority.updatedSuccess"),
                    });
                    await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
                    await queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.ROOT });
                },
                onError: (error) => handleApiError(error),
            }
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={isPending}>
                    <FlagIcon />
                    {t("setPriority.setButton")}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {PRIORITIES.map((p) => (
                    <DropdownMenuItem
                        key={p.value}
                        onSelect={() => handleSelect(p.value)}
                        className={p.value === currentPriority ? "font-semibold" : undefined}
                    >
                        {p.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
