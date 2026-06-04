import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { handleFormError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useUpdateFeedbackStatusMutation } from "../mutation/feedback.mutation";
import { FEEDBACK_QUERY_KEYS } from "../queries";
import type { FeedbackStatus, FeedbackUpdateStatusFormData } from "../types";

interface UpdateFeedbackStatusPopoverProps {
    feedbackId: number;
    currentStatus: FeedbackStatus;
    trigger: ReactNode;
}

export function UpdateFeedbackStatusPopover({
    feedbackId,
    currentStatus,
    trigger,
}: UpdateFeedbackStatusPopoverProps) {
    const { t } = useTranslation("feedback");
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useUpdateFeedbackStatusMutation();

    const STATUS_OPTIONS: { value: Exclude<FeedbackStatus, "OPEN">; label: string }[] = [
        { value: "IN_REVIEW", label: t("status.IN_REVIEW") },
        { value: "ACCEPTED", label: t("status.ACCEPTED") },
        { value: "REJECTED", label: t("status.REJECTED") },
        { value: "DELIVERED", label: t("status.DELIVERED") },
    ];

    const form = useForm<FeedbackUpdateStatusFormData>({
        defaultValues: {
            status: currentStatus !== "OPEN" ? currentStatus : "IN_REVIEW",
        },
        mode: "onSubmit",
    });

    const onSubmit = (payload: FeedbackUpdateStatusFormData) => {
        mutate(
            { id: feedbackId, payload },
            {
                onSuccess: async () => {
                    toast.success(t("common:toast.success"), {
                        description: t("updateStatus.updatedSuccess"),
                    });
                    await queryClient.invalidateQueries({ queryKey: FEEDBACK_QUERY_KEYS.ROOT });
                    setOpen(false);
                },
                onError: (error) => {
                    handleFormError(error as AxiosError, form);
                },
            }
        );
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent align="end" className="w-64">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="status"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="status">
                                        {t("updateStatus.statusLabel")}
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="status" className="w-full">
                                            <SelectValue
                                                placeholder={t("updateStatus.statusPlaceholder")}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {STATUS_OPTIONS.map((o) => (
                                                <SelectItem key={o.value} value={o.value}>
                                                    {o.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Field orientation="horizontal" className="justify-end">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                disabled={isPending}
                                onClick={() => setOpen(false)}
                            >
                                {t("common:actions.cancel")}
                            </Button>
                            <Button type="submit" size="sm" disabled={isPending}>
                                {t("common:actions.save")}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </PopoverContent>
        </Popover>
    );
}
