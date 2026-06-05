import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants";
import { useCurrentUser, useIsAdmin } from "@/hooks/use-current-user";
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { useDeleteTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries/queryKeys";
import type { Ticket } from "../types";

interface TicketActionProps {
    ticket: Ticket;
}

export function TicketActions({ ticket }: TicketActionProps) {
    const { t } = useTranslation("ticket");
    const currentUser = useCurrentUser();
    const isAdmin = useIsAdmin();
    const queryClient = useQueryClient();
    const { mutate: deleteTicket, isPending } = useDeleteTicketMutation();

    const canEdit = currentUser?.id === ticket.created_by?.id && ticket.status === "OPEN";
    const canDelete =
        ticket.status === "OPEN" && (isAdmin || currentUser?.id === ticket.created_by?.id);

    if (!canEdit && !canDelete) {
        return null;
    }

    const handleDelete = () => {
        deleteTicket(ticket.id, {
            onSuccess: async () => {
                toast.success(t("common:toast.success"), {
                    description: t("delete.deletedSuccess"),
                });
                await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
            },
            onError: () => {
                toast.error(t("common:toast.operationFailed"), {
                    description: t("delete.deleteFailed"),
                });
            },
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-44 rounded-lg"
                    align="end"
                    sideOffset={4}
                >
                    {canEdit && (
                        <DropdownMenuItem asChild>
                            <NavLink to={ROUTES.TICKET.EDIT.replace(":id", String(ticket.id))}>
                                {t("actions.edit")}
                            </NavLink>
                        </DropdownMenuItem>
                    )}
                    {canDelete && (
                        <DeleteDialog
                            title={t("delete.title")}
                            description={t("delete.description", { name: ticket.title })}
                            onConfirm={handleDelete}
                            isPending={isPending}
                            trigger={
                                <DropdownMenuItem
                                    variant="destructive"
                                    className="cursor-pointer"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    {t("actions.delete")}
                                </DropdownMenuItem>
                            }
                        />
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
