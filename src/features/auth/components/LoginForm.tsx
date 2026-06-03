import { ErbaImg } from "@/assets/images";
import { GoogleSvg } from "@/assets/svgs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ROUTES } from "@/constants";
import { handleFormError } from "@/lib/handle-form-error";
import { cn } from "@/lib/utils";
import type { AxiosError } from "axios";
import type { ComponentProps } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { useGoogleLoginMutation, useLoginMutation } from "../mutation/auth.mutation";
import type { LoginRequest } from "../types";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
    const { t } = useTranslation("auth");
    const { mutate: login, isPending } = useLoginMutation();
    const { mutate: googleLogin, isPending: isGooglePending } = useGoogleLoginMutation();

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
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <NavLink to={ROUTES.HOME}>
                                    <h1 className="text-2xl font-bold">{t("login.title")}</h1>
                                </NavLink>
                                <p className="text-balance text-muted-foreground">
                                    {t("login.subtitle")}
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
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
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
                                                to="#"
                                                className="ml-auto text-xs underline-offset-2 hover:underline"
                                            >
                                                {t("login.forgotPassword")}
                                            </NavLink>
                                        </div>
                                        <Input {...field} id={field.name} type="password" />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Field>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Spinner /> {t("login.loggingIn")}
                                        </>
                                    ) : (
                                        t("login.loginButton")
                                    )}
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                {t("login.continueWith")}
                            </FieldSeparator>
                            <Field>
                                <Button
                                    variant="outline"
                                    type="button"
                                    disabled={isPending || isGooglePending}
                                    onClick={() => handleGoogleLogin()}
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
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src={ErbaImg}
                            alt="Image"
                            className="absolute inset-0 h-full w-full border object-cover contrast-125 saturate-150"
                        />
                    </div>
                </CardContent>
            </Card>
            <p className="px-6 text-center text-sm text-muted-foreground">{t("login.madeBy")}</p>
        </div>
    );
}
