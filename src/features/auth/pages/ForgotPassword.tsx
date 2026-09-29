import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ERROR_CODES } from "@/constants";
import { handleFormError } from "@/lib/handle-form-error";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { AuthLayout } from "../components/AuthLayout";
import { useForgotPasswordMutation } from "../mutation/auth.mutation";
import type { ForgotPasswordRequest } from "../types";

type RateLimitError = {
    code?: string;
    message?: string;
    details?: {
        retry_after?: number | string;
    };
};

type ForgotPasswordError = RateLimitError & {
    error?: RateLimitError;
};

export function ForgotPassword() {
    const { t } = useTranslation("auth");
    const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
    const [now, setNow] = useState(() => Date.now());
    const { mutate: reset, isPending } = useForgotPasswordMutation();

    useEffect(() => {
        if (cooldownUntil === null) return;

        const intervalId = window.setInterval(() => {
            const currentTime = Date.now();

            setNow(currentTime);

            if (currentTime >= cooldownUntil) {
                setCooldownUntil(null);
            }
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, [cooldownUntil]);

    const form = useForm<ForgotPasswordRequest>({
        defaultValues: {
            email: "",
        },
        mode: "onSubmit",
    });

    const cooldownSeconds = cooldownUntil
        ? Math.max(0, Math.ceil((cooldownUntil - now) / 1000))
        : 0;
    const isCooldownActive = cooldownSeconds > 0;

    const onSubmit = (payload: ForgotPasswordRequest) => {
        if (isCooldownActive) return;

        reset(payload, {
            onSuccess: () => {
                toast.success(t("forgot-password.resetSuccess"));
                form.reset();
            },

            onError: (error) => {
                const axiosError = error as AxiosError<ForgotPasswordError>;
                const data = axiosError.response?.data;
                const errorData = data?.error ?? data;

                if (errorData?.code === ERROR_CODES.RATE_LIMITED) {
                    const retryAfter = Math.max(
                        0,
                        Math.ceil(Number(errorData.details?.retry_after) || 0)
                    );

                    if (retryAfter > 0) {
                        const currentTime = Date.now();

                        setNow(currentTime);
                        setCooldownUntil(currentTime + retryAfter * 1000);
                    }

                    toast.error(errorData.message ?? t("forgot-password.rateLimited"), {
                        description:
                            retryAfter > 0
                                ? t("forgot-password.retryAfter", { count: retryAfter })
                                : undefined,
                    });

                    return;
                }

                handleFormError(axiosError, form);
            },
        });
    };

    return (
        <AuthLayout>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">{t("forgot-password.heading")}</h1>

                        <p className="text-sm text-balance text-muted-foreground">
                            {t("forgot-password.description")}
                        </p>
                    </div>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>
                                    {t("forgot-password.emailLabel")}
                                </FieldLabel>

                                <Input
                                    {...field}
                                    id={field.name}
                                    type="email"
                                    placeholder={t("forgot-password.emailPlaceholder")}
                                    tabIndex={1}
                                    autoFocus
                                />

                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Field>
                        <Button type="submit" disabled={isPending || isCooldownActive}>
                            {isPending ? (
                                <>
                                    <Spinner />
                                    {t("forgot-password.resetingButton")}
                                </>
                            ) : isCooldownActive ? (
                                t("forgot-password.cooldown", { count: cooldownSeconds })
                            ) : (
                                t("forgot-password.resetButton")
                            )}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </AuthLayout>
    );
}
