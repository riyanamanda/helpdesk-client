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
import { toast } from "sonner";
import { useSetPriorityMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import type { TicketPriority, TicketPriorityFormData } from "../types";

const PRIORITIES: { label: string; value: TicketPriority }[] = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
    { label: "Urgent", value: "URGENT" },
];

interface SetPrioritySheetProps {
    ticketId: number;
    currentPriority: TicketPriority | null;
}

export function SetPrioritySheet({ ticketId, currentPriority }: SetPrioritySheetProps) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useSetPriorityMutation();

    const form = useForm<TicketPriorityFormData>({
        defaultValues: { priority: currentPriority ?? "MEDIUM" },
        mode: "onSubmit",
    });

    const onSubmit = (payload: TicketPriorityFormData) => {
        mutate(
            { id: ticketId, payload },
            {
                onSuccess: async () => {
                    toast.success("Success", { description: "Priority updated successfully" });
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
                    Set Priority
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Set Priority</SheetTitle>
                    <SheetDescription>Choose the priority level for this ticket.</SheetDescription>
                </SheetHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="px-6">
                    <FieldGroup>
                        <Controller
                            name="priority"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="priority">Priority</FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="priority">
                                            <SelectValue placeholder="Select priority" />
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
                        Cancel
                    </Button>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                        Save
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
