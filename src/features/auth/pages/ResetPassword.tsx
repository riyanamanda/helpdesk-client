import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ROUTES } from "@/constants";
import { handleFormError } from "@/lib/handle-form-error";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { AuthLayout } from "../components/AuthLayout";
import { useResetPasswordMutation } from "../mutation/auth.mutation";
import type { ResetPasswordRequest } from "../types";

export function ResetPassword() {
    const { t } = useTranslation("auth");
    const { mutate: reset, isPending } = useResetPasswordMutation();
    const navigate = useNavigate();

    const [params] = useSearchParams();
    const token = params.get("token");

    const form = useForm<ResetPasswordRequest>({
        defaultValues: {
            token: token,
            new_password: "",
            password_confirm: "",
        },
    });

    const onSubmit = (payload: ResetPasswordRequest) => {
        if (payload.new_password != payload.password_confirm) {
            form.setError("password_confirm", {
                type: "manual",
                message: "your password does not match",
            });
            return;
        }

        reset(payload, {
            onSuccess: async () => {
                toast.success("Reset password success");
                await navigate(ROUTES.LOGIN, { replace: true });
            },
            onError: (error) => {
                handleFormError(error as AxiosError, form);
            },
        });
    };

    return (
        <AuthLayout>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">{t("reset-password.heading")}</h1>

                        <p className="text-sm text-balance text-muted-foreground">
                            {t("reset-password.description")}
                        </p>
                    </div>

                    <Controller
                        name="new_password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>
                                    {t("reset-password.newPasswordLabel")}
                                </FieldLabel>

                                <Input
                                    {...field}
                                    id={field.name}
                                    type="password"
                                    tabIndex={1}
                                    autoFocus
                                />

                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="password_confirm"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>
                                    {t("reset-password.newPasswordConfirmLabel")}
                                </FieldLabel>

                                <Input {...field} id={field.name} type="password" tabIndex={2} />

                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Field>
                        <Button type="submit" disabled={isPending} tabIndex={3}>
                            {isPending ? (
                                <>
                                    <Spinner />
                                    {t("reset-password.resetSubmitting")}
                                </>
                            ) : (
                                t("reset-password.resetSubmit")
                            )}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </AuthLayout>
    );
}
