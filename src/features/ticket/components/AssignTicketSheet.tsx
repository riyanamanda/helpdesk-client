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
import { listAssignableUserQueryOption } from "@/features/user/queries/user.query";
import { handleFormError } from "@/lib/handle-form-error";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { UserPlusIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAssignTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import type { TicketAssignFormData } from "../types";

interface AssignTicketSheetProps {
    ticketId: number;
}

export function AssignTicketSheet({ ticketId }: AssignTicketSheetProps) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useAssignTicketMutation();

    const { data: assignableUsersData } = useQuery(listAssignableUserQueryOption());
    const assignableUsers = assignableUsersData?.data ?? [];

    const form = useForm<TicketAssignFormData>({
        defaultValues: { assigned_to: "" },
        mode: "onSubmit",
    });

    const onSubmit = (payload: TicketAssignFormData) => {
        mutate(
            { id: ticketId, payload },
            {
                onSuccess: async () => {
                    toast.success("Success", { description: "Ticket assigned successfully" });
                    await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
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
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <UserPlusIcon />
                    Assign
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Assign Ticket</SheetTitle>
                    <SheetDescription>Select a user to assign this ticket to.</SheetDescription>
                </SheetHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="px-6">
                    <FieldGroup>
                        <Controller
                            name="assigned_to"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="assigned_to">Assign To</FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="assigned_to">
                                            <SelectValue placeholder="Select user" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="__none__">Select a user</SelectItem>
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
                    </FieldGroup>
                </form>
                <SheetFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                        Assign
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
