import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PaperclipIcon } from "lucide-react";

interface AttachmentViewerProps {
    fileUrl: string;
    label?: string;
}

export function AttachmentViewer({ fileUrl, label = "View attachment" }: AttachmentViewerProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                    <PaperclipIcon className="size-3" />
                    {label}
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] p-0 sm:max-w-[90vw]">
                <div className="flex h-[90vh] flex-col">
                    <DialogHeader className="shrink-0 border-b px-4 py-3">
                        <DialogTitle>Attachment</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-1 items-center justify-center overflow-hidden bg-muted/50 p-2">
                        <img
                            src={fileUrl}
                            alt="Attachment"
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
