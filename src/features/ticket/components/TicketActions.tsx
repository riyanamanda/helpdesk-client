import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants";
import { PERMISSIONS } from "@/constants/permissions";
import { useCurrentUser, useHasPermission, useIsAdmin } from "@/hooks/use-current-user";
import { handleApiError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { DASHBOARD_QUERY_KEYS } from "@/features/dashboard/queries/dashboard.query";
import { useDeleteTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import type { Ticket } from "../types";

interface TicketActionProps {
    ticket: Ticket;
}

export function TicketActions({ ticket }: TicketActionProps) {
    const { t } = useTranslation("ticket");
    const currentUser = useCurrentUser();
    const canUpdatePermission = useHasPermission(PERMISSIONS.TICKET.UPDATE);
    const canDeletePermission = useHasPermission(PERMISSIONS.TICKET.DELETE);
    const queryClient = useQueryClient();
    const { mutate: deleteTicket, isPending } = useDeleteTicketMutation();

    const isAdmin = useIsAdmin();
    const isOwner = currentUser?.id === ticket.created_by?.id;
    const canEdit = ticket.status === "OPEN" && canUpdatePermission && (isOwner || isAdmin);
    const canDelete = ticket.status === "OPEN" && canDeletePermission && (isOwner || isAdmin);

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
                await queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.ROOT });
            },
            onError: (error) => handleApiError(error),
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
