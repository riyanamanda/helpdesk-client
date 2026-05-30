import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateUserPasswordMutation } from "../mutation/user.mutation";
import type { UpdateUserPasswordFormData, User } from "../types";

interface UpdateUserPasswordDialogProps {
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UpdateUserPasswordDialog({
    user,
    open,
    onOpenChange,
}: UpdateUserPasswordDialogProps) {
    const { mutate, isPending } = useUpdateUserPasswordMutation();

    const form = useForm<UpdateUserPasswordFormData>({
        defaultValues: { password: "", confirm_password: "" },
    });

    const onSubmit = ({ password }: UpdateUserPasswordFormData) => {
        mutate(
            { id: user.id, password },
            {
                onSuccess: () => {
                    toast.success("Success", { description: "Password updated successfully" });
                    onOpenChange(false);
                    form.reset();
                },
                onError: (error) => {
                    const axiosError = error as AxiosError<{ error: { message: string } }>;
                    toast.error(
                        axiosError.response?.data?.error?.message ?? "Failed to update password"
                    );
                },
            }
        );
    };

    const handleOpenChange = (next: boolean) => {
        if (!next) form.reset();
        onOpenChange(next);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Set a new password for <span className="font-medium">{user.name}</span>.
                    </DialogDescription>
                </DialogHeader>

                <form id="password-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="password"
                            control={form.control}
                            rules={{
                                required: "Password is required",
                                minLength: { value: 8, message: "Min 8 characters" },
                            }}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="password">
                                        New Password <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="confirm_password"
                            control={form.control}
                            rules={{
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === form.getValues("password") ||
                                    "Passwords do not match",
                            }}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="confirm_password">
                                        Confirm Password <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="confirm_password"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>

                <DialogFooter>
                    <Button
                        variant="ghost"
                        onClick={() => handleOpenChange(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button form="password-form" type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Spinner /> Saving...
                            </>
                        ) : (
                            "Update Password"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
