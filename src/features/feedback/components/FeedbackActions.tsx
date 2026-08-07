import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PERMISSIONS } from "@/constants/permissions";
import { useCurrentUser, useHasPermission, useIsAdmin } from "@/hooks/use-current-user";
import { handleApiError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useDeleteFeedbackMutation } from "../mutation/feedback.mutation";
import { FEEDBACK_QUERY_KEYS } from "../queries";
import type { Feedback } from "../types";

interface FeedbackActionProps {
    feedback: Feedback;
}

export function FeedbackActions({ feedback }: FeedbackActionProps) {
    const { t } = useTranslation("feedback");
    const currentUser = useCurrentUser();
    const canDeletePermission = useHasPermission(PERMISSIONS.FEEDBACK.DELETE);
    const queryClient = useQueryClient();
    const { mutate: deleteFeedback, isPending } = useDeleteFeedbackMutation();

    const isAdmin = useIsAdmin();
    const isOwner = currentUser?.id === feedback.created_by?.id;
    const canDelete = feedback.status === "OPEN" && canDeletePermission && (isOwner || isAdmin);

    if (!canDelete) {
        return null;
    }

    const handleDelete = () => {
        deleteFeedback(feedback.id, {
            onSuccess: async () => {
                toast.success(t("common:toast.success"), {
                    description: t("delete.deletedSuccess"),
                });
                await queryClient.invalidateQueries({ queryKey: FEEDBACK_QUERY_KEYS.ROOT });
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
                    {canDelete && (
                        <DeleteDialog
                            title={t("delete.title")}
                            description={t("delete.description", { name: feedback.title })}
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
