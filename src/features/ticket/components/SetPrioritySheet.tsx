import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { handleFormError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { FlagIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useSetPriorityMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import type { TicketPriority, TicketPriorityFormData } from "../types";

interface SetPrioritySheetProps {
    ticketId: number;
    currentPriority: TicketPriority | null;
}

export function SetPrioritySheet({ ticketId, currentPriority }: SetPrioritySheetProps) {
    const { t } = useTranslation("ticket");
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useSetPriorityMutation();

    const PRIORITIES: { label: string; value: TicketPriority }[] = [
        { label: t("priority.LOW"), value: "LOW" },
        { label: t("priority.MEDIUM"), value: "MEDIUM" },
        { label: t("priority.HIGH"), value: "HIGH" },
        { label: t("priority.URGENT"), value: "URGENT" },
    ];

    const form = useForm<TicketPriorityFormData>({
        defaultValues: { priority: currentPriority ?? "MEDIUM" },
        mode: "onSubmit",
    });

    const onSubmit = (payload: TicketPriorityFormData) => {
        mutate(
            { id: ticketId, payload },
            {
                onSuccess: async () => {
                    toast.success(t("common:toast.success"), {
                        description: t("setPriority.updatedSuccess"),
                    });
                    await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
                    setOpen(false);
                },
                onError: (error) => {
                    handleFormError(error as AxiosError, form);
                },
            }
        );
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <FlagIcon />
                    {t("setPriority.setButton")}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{t("setPriority.sheetTitle")}</SheetTitle>
                    <SheetDescription>{t("setPriority.sheetDescription")}</SheetDescription>
                </SheetHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="px-6">
                    <FieldGroup>
                        <Controller
                            name="priority"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="priority">
                                        {t("setPriority.priorityLabel")}
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="priority">
                                            <SelectValue
                                                placeholder={t("setPriority.priorityPlaceholder")}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PRIORITIES.map((p) => (
                                                <SelectItem key={p.value} value={p.value}>
                                                    {p.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
                <SheetFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
                        {t("common:actions.cancel")}
                    </Button>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                        {t("setPriority.saveButton")}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
