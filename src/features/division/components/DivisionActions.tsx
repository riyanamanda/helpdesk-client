import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants";
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
    const queryClient = useQueryClient();
    const { mutate: deleteDivision, isPending } = useDeleteDivisionMutation();

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
            onError: () => {
                toast.error(t("common:toast.operationFailed"), {
                    description: t("delete.deleteFailed"),
                });
            },
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <NavLink to={ROUTES.DIVISION.EDIT.replace(":id", String(division.id))}>
                        {t("actions.edit")}
                    </NavLink>
                </DropdownMenuItem>
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
