import { GoogleSvg } from "@/assets/svgs";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { handleFormError } from "@/lib/handle-form-error";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { AuthLayout } from "../components/AuthLayout";
import { useGoogleOneTap } from "../hooks/useGoogleOneTap";
import { useGoogleLoginMutation, useLoginMutation } from "../mutation/auth.mutation";
import type { LoginRequest } from "../types";
import { ROUTES } from "@/constants";

export function LoginPage() {
    const { t } = useTranslation("auth");
    const { mutate: login, isPending } = useLoginMutation();
    const { mutate: googleLogin, isPending: isGooglePending } = useGoogleLoginMutation();
    const { isPending: isOneTapPending } = useGoogleOneTap();

    const isAnyPending = isPending || isGooglePending || isOneTapPending;

    const form = useForm<LoginRequest>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = (payload: LoginRequest) => {
        login(payload, {
            onError: (error) => {
                handleFormError(error as AxiosError, form);
            },
        });
    };

    const handleGoogleLogin = () => {
        googleLogin(undefined, {
            onError: (error) => {
                const axiosError = error as AxiosError<{ error: { message: string } }>;
                toast.error(axiosError.response?.data?.error?.message ?? t("login.failedGoogle"));
            },
        });
    };

    return (
        <AuthLayout>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">{t("login.heading")}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {t("login.description")}
                        </p>
                    </div>

                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>
                                    {t("login.emailLabel")}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="email"
                                    placeholder={t("login.emailPlaceholder")}
                                    tabIndex={1}
                                    autoFocus
                                />
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor={field.name}>
                                        {t("login.passwordLabel")}
                                    </FieldLabel>
                                    <NavLink
                                        to={ROUTES.FORGOT_PASSWORD}
                                        className="ml-auto text-xs underline-offset-2 hover:underline"
                                        tabIndex={6}
                                    >
                                        {t("login.forgotPassword")}
                                    </NavLink>
                                </div>
                                <Input {...field} id={field.name} type="password" tabIndex={2} />
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Field>
                        <Button type="submit" disabled={isAnyPending} tabIndex={3}>
                            {isPending ? (
                                <>
                                    <Spinner /> {t("login.loggingIn")}
                                </>
                            ) : (
                                t("login.loginButton")
                            )}
                        </Button>
                    </Field>

                    <FieldSeparator>{t("login.continueWith")}</FieldSeparator>
                    <Field>
                        <Button
                            variant="outline"
                            type="button"
                            disabled={isAnyPending}
                            onClick={() => handleGoogleLogin()}
                            tabIndex={5}
                        >
                            {isGooglePending ? (
                                <>
                                    <Spinner /> {t("login.signingIn")}
                                </>
                            ) : (
                                <>
                                    <img src={GoogleSvg} alt="Google" className="size-4" />
                                    {t("login.loginWithGoogle")}
                                </>
                            )}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </AuthLayout>
    );
}
