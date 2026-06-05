import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TFunction } from "i18next";
import { AlignLeftIcon, CheckCircle2Icon, PaperclipIcon } from "lucide-react";
import { AttachmentViewer } from "./AttachmentViewer";
import type { TicketDetail } from "../types";

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
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                        <AlignLeftIcon className="size-4 text-muted-foreground" />
                        {t("detail.description")}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                        {ticket.description}
                    </p>
                </CardContent>
            </Card>

            {ticket.resolution && (
                <Card className="border-green-500/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <CheckCircle2Icon className="size-4 text-green-500" />
                            {t("detail.resolution")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                            {ticket.resolution}
                        </p>
                        {resolutionAttachments.length > 0 && (
                            <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                                {resolutionAttachments.map((a) => (
                                    <AttachmentViewer key={a.id} fileUrl={a.file_url} />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {reportAttachments.length > 0 && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <PaperclipIcon className="size-4 text-muted-foreground" />
                            {t("detail.attachments")}
                            <span className="ml-auto text-xs font-normal text-muted-foreground">
                                {reportAttachments.length}{" "}
                                {reportAttachments.length !== 1
                                    ? t("detail.filesCount_other", {
                                          count: reportAttachments.length,
                                      })
                                    : t("detail.filesCount_one", {
                                          count: reportAttachments.length,
                                      })}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {reportAttachments.map((a) => (
                            <AttachmentViewer key={a.id} fileUrl={a.file_url} />
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
