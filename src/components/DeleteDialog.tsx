import { Spinner } from "@/components/ui/spinner";
import { Trash2Icon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";

interface DeleteDialogProps {
    title?: string;
    description: string;
    onConfirm: () => void;
    isPending?: boolean;
    trigger: ReactNode;
    confirmLabel?: string;
    pendingLabel?: string;
    icon?: ReactNode;
}

export function DeleteDialog({
    title,
    description,
    onConfirm,
    isPending = false,
    trigger,
    confirmLabel,
    pendingLabel,
    icon = <Trash2Icon />,
}: DeleteDialogProps) {
    const { t } = useTranslation("common");
    const [open, setOpen] = useState(false);

    const resolvedTitle = title ?? t("dialog.areYouSure");
    const resolvedConfirmLabel = confirmLabel ?? t("dialog.deleteConfirm");
    const resolvedPendingLabel = pendingLabel ?? t("dialog.deleting");

    const handleOpenChange = (next: boolean) => {
        if (!next && isPending) return;
        setOpen(next);
    };

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        {icon}
                    </AlertDialogMedia>
                    <AlertDialogTitle>{resolvedTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" disabled={isPending}>
                        {t("actions.cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        disabled={isPending}
                        onClick={onConfirm}
                    >
                        {isPending && <Spinner data-icon="inline-start" />}
                        {isPending ? resolvedPendingLabel : resolvedConfirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
