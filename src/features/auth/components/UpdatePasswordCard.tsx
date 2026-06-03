import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { handleFormError } from "@/lib/handle-form-error";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "../mutation/profile.mutation";
import type { UpdatePasswordRequest } from "../types";

interface UpdatePasswordFormData extends UpdatePasswordRequest {
    confirm_new_password: string;
}

export function UpdatePasswordCard() {
    const { mutate, isPending } = useUpdatePasswordMutation();

    const form = useForm<UpdatePasswordFormData>({
        defaultValues: { current_password: "", new_password: "", confirm_new_password: "" },
    });

    const onSubmit = ({ current_password, new_password }: UpdatePasswordFormData) => {
        mutate(
            { current_password, new_password },
            {
                onSuccess: () => {
                    toast.success("Password updated successfully");
                    form.reset();
                },
                onError: (error) => {
                    handleFormError(error as AxiosError, form);
                },
            }
        );
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="current_password"
                            control={form.control}
                            rules={{ required: "Current password is required" }}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>
                                        Current Password <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="new_password"
                            control={form.control}
                            rules={{ required: "New password is required" }}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>
                                        New Password <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="confirm_new_password"
                            control={form.control}
                            rules={{
                                required: "Please confirm your new password",
                                validate: (value) =>
                                    value === form.getValues("new_password") ||
                                    "Passwords do not match",
                            }}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>
                                        Confirm New Password{" "}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Field orientation="horizontal" className="justify-end">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Spinner /> Saving...
                                    </>
                                ) : (
                                    "Update Password"
                                )}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
