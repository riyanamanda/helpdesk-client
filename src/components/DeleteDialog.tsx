import { Spinner } from "@/components/ui/spinner";
import { Trash2Icon } from "lucide-react";
import { useState, type ReactNode } from "react";
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
}

export function DeleteDialog({
    title = "Are you sure?",
    description,
    onConfirm,
    isPending = false,
    trigger,
}: DeleteDialogProps) {
    const [open, setOpen] = useState(false);

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
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        disabled={isPending}
                        onClick={onConfirm}
                    >
                        {isPending && <Spinner data-icon="inline-start" />}
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
