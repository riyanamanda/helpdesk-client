import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants";
import { useIsAdmin } from "@/hooks/use-current-user";
import { handleApiError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { useDeleteCategoryMutation } from "../mutation/category.mutation";
import { CATEGORY_QUERY_KEYS } from "../queries";
import type { Category } from "../types";

interface CategoryActionsProps {
    category: Category;
}

export function CategoryActions({ category }: CategoryActionsProps) {
    const { t } = useTranslation("category");
    const isAdmin = useIsAdmin();
    const queryClient = useQueryClient();
    const { mutate: deleteCategory, isPending } = useDeleteCategoryMutation();

    if (!isAdmin) return null;

    const handleDelete = () => {
        deleteCategory(category.id, {
            onSuccess: async () => {
                toast.success(t("common:toast.success"), {
                    description: t("delete.deletedSuccess"),
                });
                await queryClient.invalidateQueries({
                    queryKey: CATEGORY_QUERY_KEYS.ROOT,
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
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <NavLink to={ROUTES.CATEGORY.EDIT.replace(":id", String(category.id))}>
                        {t("actions.edit")}
                    </NavLink>
                </DropdownMenuItem>
                <DeleteDialog
                    title={t("delete.title")}
                    description={t("delete.description", { name: category.name })}
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
