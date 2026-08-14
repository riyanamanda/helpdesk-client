import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TFunction } from "i18next";
import {
    AlignLeftIcon,
    CheckCircle2Icon,
    MessageCircleIcon,
    PaperclipIcon,
    UserIcon,
} from "lucide-react";
import type { TicketDetail } from "../types";
import { AttachmentViewer } from "./AttachmentViewer";

interface TicketDetailContentProps {
    ticket: TicketDetail;
    t: TFunction<"ticket">;
}

export function TicketDetailContent({ ticket, t }: TicketDetailContentProps) {
    const reportAttachments =
        ticket.attachment?.filter((a) => a.attachment_type === "REPORT") ?? [];
    const resolutionAttachments =
        ticket.attachment?.filter((a) => a.attachment_type === "RESOLUTION") ?? [];

    return (
        <div className="flex flex-col gap-4 lg:col-span-2">
            <Card className="overflow-hidden shadow-xs">
                <CardHeader className="border-b bg-muted/30 pb-4">
                    <CardTitle className="flex items-center gap-2 text-base font-semibold">
                        <AlignLeftIcon className="size-4 text-primary" />
                        {t("detail.description")}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-6">
                    <div className="space-y-4">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                            {ticket.description}
                        </p>

                        {reportAttachments.length > 0 && (
                            <div className="rounded-lg border bg-muted/20 p-3">
                                <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                    <PaperclipIcon className="size-3.5" />
                                    {t("detail.reportAttachments")} ({reportAttachments.length})
                                </p>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {reportAttachments.map((a) => (
                                        <AttachmentViewer key={a.id} fileUrl={a.file_url} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {ticket.assign_note && (
                        <div className="rounded-r-lg border-l-4 border-l-blue-500 bg-blue-50/50 p-4 dark:bg-blue-950/20">
                            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900 dark:text-blue-300">
                                <MessageCircleIcon className="size-4 shrink-0 text-blue-500" />
                                <span>
                                    {t("detail.assignNote")} {ticket.assigned_by?.name ?? "Admin"}
                                </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap text-blue-950/90 dark:text-blue-200/90">
                                {ticket.assign_note}
                            </p>
                            {ticket.assigned_by && (
                                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-blue-700/70 dark:text-blue-400/80">
                                    <UserIcon className="size-3" />
                                    <span>{ticket.assigned_to?.name ?? "-"}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {ticket.resolution && (
                        <div className="rounded-r-lg border-l-4 border-l-emerald-500 bg-emerald-50/50 p-4 dark:bg-emerald-950/20">
                            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                                <CheckCircle2Icon className="size-4 shrink-0 text-emerald-500" />
                                <span>{t("detail.resolution")}</span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap text-emerald-950/90 dark:text-emerald-200/90">
                                {ticket.resolution}
                            </p>

                            {resolutionAttachments.length > 0 && (
                                <div className="mt-4 border-t border-emerald-500/20 pt-3">
                                    <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                                        <PaperclipIcon className="size-3.5" />
                                        {t("detail.resolutionAttachments")} (
                                        {resolutionAttachments.length})
                                    </p>
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        {resolutionAttachments.map((a) => (
                                            <AttachmentViewer key={a.id} fileUrl={a.file_url} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
