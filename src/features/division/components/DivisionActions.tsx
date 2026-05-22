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
import { useDeleteDivisionMutation } from "../mutation/division.mutation";
import { DIVISION_QUERY_KEYS } from "../queries";
import type { Division } from "../types";

interface DivisionActionsProps {
    division: Division;
}

export function DivisionActions({ division }: DivisionActionsProps) {
    const queryClient = useQueryClient();
    const { mutate: deleteDivision, isPending } = useDeleteDivisionMutation();

    const handleDelete = () => {
        deleteDivision(division.id, {
            onSuccess: async () => {
                toast.success("Success", {
                    description: "Division deleted successfully",
                });
                await queryClient.invalidateQueries({
                    queryKey: DIVISION_QUERY_KEYS.ROOT,
                });
            },
            onError: () => {
                toast.error("Operation failed", {
                    description: "Failed to delete division",
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
                        Edit
                    </NavLink>
                </DropdownMenuItem>
                <DeleteDialog
                    title="Delete Division?"
                    description={`"${division.name}" will be permanently deleted and cannot be recovered.`}
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
