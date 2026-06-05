import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { handleFormError } from "@/lib/handle-form-error";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "../mutation/profile.mutation";
import type { UpdatePasswordRequest } from "../types";

interface UpdatePasswordFormData extends UpdatePasswordRequest {
    confirm_new_password: string;
}

export function UpdatePasswordCard() {
    const { t } = useTranslation("auth");
    const { mutate, isPending } = useUpdatePasswordMutation();

    const form = useForm<UpdatePasswordFormData>({
        defaultValues: { current_password: "", new_password: "", confirm_new_password: "" },
    });

    const onSubmit = ({ current_password, new_password }: UpdatePasswordFormData) => {
        mutate(
            { current_password, new_password },
            {
                onSuccess: () => {
                    toast.success(t("password.updatedSuccess"));
                    form.reset();
                },
                onError: (error) => {
                    handleFormError(error as AxiosError, form);
                },
            }
        );
    };

    return (
        <Card className="mx-auto max-w-xl">
            <CardHeader>
                <CardTitle className="text-sm font-medium">{t("password.changeTitle")}</CardTitle>
                <CardDescription>{t("common:form.fillRequired")}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="current_password"
                            control={form.control}
                            rules={{ required: t("password.currentRequired") }}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>
                                        {t("password.currentPassword")}{" "}
                                        <span className="text-destructive">*</span>
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
                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="new_password"
                                control={form.control}
                                rules={{ required: t("password.newRequired") }}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>
                                            {t("password.newPassword")}{" "}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="password"
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="confirm_new_password"
                                control={form.control}
                                rules={{
                                    required: t("password.confirmRequired"),
                                    validate: (value) =>
                                        value === form.getValues("new_password") ||
                                        t("password.mismatch"),
                                }}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>
                                            {t("password.confirmPassword")}{" "}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="password"
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                        <Field orientation="horizontal" className="justify-end">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Spinner /> {t("password.saving")}
                                    </>
                                ) : (
                                    t("password.updateButton")
                                )}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
