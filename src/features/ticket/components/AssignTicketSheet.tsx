import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DASHBOARD_QUERY_KEYS } from "@/features/dashboard/queries/dashboard.query";
import { listAssignableUserQueryOption } from "@/features/user/queries/user.query";
import { handleApiError } from "@/lib/handle-form-error";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserPlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useAssignTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";

interface AssignTicketSheetProps {
    ticketId: number;
}

export function AssignTicketSheet({ ticketId }: AssignTicketSheetProps) {
    const { t } = useTranslation("ticket");
    const queryClient = useQueryClient();
    const { mutate, isPending } = useAssignTicketMutation();

    const { data: assignableUsersData } = useQuery(listAssignableUserQueryOption());
    const assignableUsers = assignableUsersData?.data ?? [];

    const handleSelect = (userId: string) => {
        mutate(
            { id: ticketId, payload: { assigned_to: userId } },
            {
                onSuccess: async () => {
                    toast.success(t("common:toast.success"), {
                        description: t("assign.assignedSuccess"),
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
                    <UserPlusIcon />
                    {t("assign.assignButton")}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {assignableUsers.map((user) => (
                    <DropdownMenuItem key={user.id} onSelect={() => handleSelect(user.id)}>
                        {user.name}
                    </DropdownMenuItem>
                ))}
                {assignableUsers.length === 0 && (
                    <DropdownMenuItem disabled>{t("common:form.selectUser")}</DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
