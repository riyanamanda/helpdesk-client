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
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation("auth");
    const { mutate, isPending } = useUpdateUserPasswordMutation();

    const form = useForm<UpdateUserPasswordFormData>({
        defaultValues: { password: "", confirm_password: "" },
    });

    const onSubmit = ({ password }: UpdateUserPasswordFormData) => {
        mutate(
            { id: user.id, password },
            {
                onSuccess: () => {
                    toast.success(t("common:toast.success"), {
                        description: t("user.passwordUpdatedSuccess"),
                    });
                    onOpenChange(false);
                    form.reset();
                },
                onError: (error) => {
                    const axiosError = error as AxiosError<{ error: { message: string } }>;
                    toast.error(
                        axiosError.response?.data?.error?.message ?? t("user.failedUpdate")
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
                    <DialogTitle>{t("user.passwordDialogTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("user.passwordDialogDescription")}{" "}
                        <span className="font-medium">{user.name}</span>.
                    </DialogDescription>
                </DialogHeader>

                <form id="password-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="password"
                            control={form.control}
                            rules={{
                                required: t("user.passwordRequired"),
                                minLength: { value: 8, message: t("user.passwordMinLength") },
                            }}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="password">
                                        {t("user.newPasswordLabel")}{" "}
                                        <span className="text-destructive">*</span>
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
                                required: t("user.confirmRequired"),
                                validate: (value) =>
                                    value === form.getValues("password") ||
                                    t("user.passwordMismatch"),
                            }}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="confirm_password">
                                        {t("user.confirmPasswordLabel")}{" "}
                                        <span className="text-destructive">*</span>
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
                        {t("common:actions.cancel")}
                    </Button>
                    <Button form="password-form" type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Spinner /> {t("user.updatingButton")}
                            </>
                        ) : (
                            t("user.updateButton")
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
