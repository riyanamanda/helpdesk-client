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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DASHBOARD_QUERY_KEYS } from "@/features/dashboard/queries/dashboard.query";
import { listAssignableUserQueryOption } from "@/features/user/queries/user.query";
import { handleFormError } from "@/lib/handle-form-error";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { UserPlusIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useAssignTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import type { TicketAssignFormData } from "../types";

interface AssignTicketSheetProps {
    ticketId: number;
}

export function AssignTicketSheet({ ticketId }: AssignTicketSheetProps) {
    const { t } = useTranslation("ticket");
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useAssignTicketMutation();

    const { data: assignableUsersData } = useQuery(listAssignableUserQueryOption());
    const assignableUsers = assignableUsersData?.data ?? [];

    const form = useForm<TicketAssignFormData>({
        defaultValues: { assigned_to: "", note: "" },
        mode: "onSubmit",
    });

    const onSubmit = (data: TicketAssignFormData) => {
        mutate(
            { id: ticketId, payload: data },
            {
                onSuccess: async () => {
                    toast.success(t("common:toast.success"), {
                        description: t("assign.assignedSuccess"),
                    });
                    await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
                    await queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.ROOT });
                    setOpen(false);
                    form.reset();
                },
                onError: (error) => {
                    handleFormError(error as AxiosError, form);
                },
            }
        );
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                setOpen(v);
                if (!v) form.reset();
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <UserPlusIcon />
                    {t("assign.assignButton")}
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-md"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>{t("assign.sheetTitle")}</DialogTitle>
                    <DialogDescription>{t("assign.sheetDescription")}</DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="assigned_to"
                            control={form.control}
                            rules={{ required: t("common:form.required") }}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="assigned_to">
                                        {t("assign.assignToLabel")}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="assigned_to">
                                            <SelectValue
                                                placeholder={t("common:form.selectUser")}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {assignableUsers.map((user) => (
                                                <SelectItem key={user.id} value={user.id}>
                                                    {user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="note"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="note">{t("assign.noteLabel")}</FieldLabel>
                                    <Textarea
                                        {...field}
                                        id={field.name}
                                        rows={4}
                                        placeholder={t("assign.notePlaceholder")}
                                        maxLength={500}
                                        className="h-48"
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
                        {t("common:actions.cancel")}
                    </Button>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                        {t("assign.submitButton")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
