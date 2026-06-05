import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { DASHBOARD_QUERY_KEYS } from "@/features/dashboard/queries/dashboard.query";
import { handleFormError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { CheckCircleIcon, PaperclipIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useResolveTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import type { TicketResolutionFormData } from "../types";

interface ResolveTicketSheetProps {
    ticketId: number;
}

export function ResolveTicketSheet({ ticketId }: ResolveTicketSheetProps) {
    const { t } = useTranslation("ticket");
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useResolveTicketMutation();

    const form = useForm<TicketResolutionFormData>({
        defaultValues: { resolution: "" },
        mode: "onSubmit",
    });

    const onSubmit = (data: TicketResolutionFormData) => {
        mutate(
            { id: ticketId, data, file: file ?? undefined },
            {
                onSuccess: async () => {
                    toast.success(t("common:toast.success"), {
                        description: t("resolve.resolvedSuccess"),
                    });
                    await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
                    await queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.ROOT });
                    setOpen(false);
                    form.reset();
                    setFile(null);
                },
                onError: (error) => {
                    handleFormError(error as AxiosError, form);
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <CheckCircleIcon />
                    {t("resolve.resolveButton")}
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-xl"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>{t("resolve.sheetTitle")}</DialogTitle>
                    <DialogDescription>{t("resolve.sheetDescription")}</DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="resolution"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="resolution">
                                        {t("resolve.resolutionLabel")}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id={field.name}
                                        rows={5}
                                        placeholder={t("resolve.resolutionPlaceholder")}
                                        maxLength={1000}
                                        className="h-48"
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Field>
                            <FieldLabel>{t("resolve.attachmentLabel")}</FieldLabel>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <PaperclipIcon />
                                    {file ? file.name : t("resolve.chooseImage")}
                                </Button>
                                {file && (
                                    <button
                                        type="button"
                                        className="cursor-pointer text-xs text-muted-foreground hover:text-destructive"
                                        onClick={() => {
                                            setFile(null);
                                            if (fileRef.current) fileRef.current.value = "";
                                        }}
                                    >
                                        {t("resolve.remove")}
                                    </button>
                                )}
                            </div>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            />
                        </Field>
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
                        {t("common:actions.cancel")}
                    </Button>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                        {t("resolve.submitButton")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
