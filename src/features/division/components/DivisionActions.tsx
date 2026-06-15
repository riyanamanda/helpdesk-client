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
import { useHasPermission } from "@/hooks/use-current-user";
import { handleApiError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { useDeleteDivisionMutation } from "../mutation/division.mutation";
import { DIVISION_QUERY_KEYS } from "../queries";
import type { Division } from "../types";

interface DivisionActionsProps {
    division: Division;
}

export function DivisionActions({ division }: DivisionActionsProps) {
    const { t } = useTranslation("division");
    const canUpdate = useHasPermission(PERMISSIONS.DIVISION.UPDATE);
    const canDelete = useHasPermission(PERMISSIONS.DIVISION.DELETE);
    const queryClient = useQueryClient();
    const { mutate: deleteDivision, isPending } = useDeleteDivisionMutation();

    if (!canUpdate && !canDelete) return null;

    const handleDelete = () => {
        deleteDivision(division.id, {
            onSuccess: async () => {
                toast.success(t("common:toast.success"), {
                    description: t("delete.deletedSuccess"),
                });
                await queryClient.invalidateQueries({
                    queryKey: DIVISION_QUERY_KEYS.ROOT,
                });
            },
            onError: (error) => handleApiError(error),
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-44 rounded-lg" align="end" sideOffset={4}>
                {canUpdate && (
                    <DropdownMenuItem asChild>
                        <NavLink to={ROUTES.DIVISION.EDIT.replace(":id", String(division.id))}>
                            {t("actions.edit")}
                        </NavLink>
                    </DropdownMenuItem>
                )}
                {canDelete && (
                    <DeleteDialog
                        title={t("delete.title")}
                        description={t("delete.description", { name: division.name })}
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
    );
}
