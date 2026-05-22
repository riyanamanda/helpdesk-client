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
import { NavLink } from "react-router";
import { toast } from "sonner";
import { useDeleteCategoryMutation } from "../mutation/category.mutation";
import { CATEGORY_QUERY_KEYS } from "../queries";
import type { Category } from "../types";

interface CategoryActionsProps {
    category: Category;
}

export function CategoryActions({ category }: CategoryActionsProps) {
    const queryClient = useQueryClient();
    const { mutate: deleteCategory, isPending } = useDeleteCategoryMutation();

    const handleDelete = () => {
        deleteCategory(category.id, {
            onSuccess: async () => {
                toast.success("Success", {
                    description: "Category deleted successfully",
                });
                await queryClient.invalidateQueries({
                    queryKey: CATEGORY_QUERY_KEYS.ROOT,
                });
            },
            onError: () => {
                toast.error("Operation failed", {
                    description: "Failed to delete category",
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
                    <NavLink to={ROUTES.CATEGORY.EDIT.replace(":id", String(category.id))}>
                        Edit
                    </NavLink>
                </DropdownMenuItem>
                <DeleteDialog
                    title="Delete Category?"
                    description={`"${category.name}" will be permanently deleted and cannot be recovered.`}
                    onConfirm={handleDelete}
                    isPending={isPending}
                    trigger={
                        <DropdownMenuItem
                            variant="destructive"
                            className="cursor-pointer"
                            onSelect={(e) => e.preventDefault()}
                        >
                            Delete
                        </DropdownMenuItem>
                    }
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
