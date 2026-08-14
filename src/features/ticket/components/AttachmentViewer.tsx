import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { resolveMediaUrl } from "@/lib/media-url";
import { PaperclipIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AttachmentViewerProps {
    fileUrl: string;
    label?: string;
}

export function AttachmentViewer({ fileUrl, label }: AttachmentViewerProps) {
    const { t } = useTranslation("ticket");
    const resolvedFileUrl = resolveMediaUrl(fileUrl);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex cursor-pointer items-center gap-1.5 text-xs text-primary hover:underline">
                    <PaperclipIcon className="size-3" />
                    {label ?? t("detail.viewAttachment")}
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] p-0 sm:max-w-[90vw]">
                <div className="flex h-[90vh] flex-col">
                    <DialogHeader className="shrink-0 border-b px-4 py-3">
                        <DialogTitle>{t("detail.attachmentDialogTitle")}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-1 items-center justify-center overflow-hidden bg-muted/50 p-2">
                        <img
                            src={resolvedFileUrl}
                            alt="Attachment"
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
