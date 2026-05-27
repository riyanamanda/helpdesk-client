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
import { NavLink } from "react-router";
import { useGoogleLoginMutation, useLoginMutation } from "../mutation/auth.mutation";
import type { LoginRequest } from "../types";
import { toast } from "sonner";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
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
                toast.error(
                    axiosError.response?.data?.error?.message ?? "Failed to sign in with Google"
                );
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
                                    <h1 className="text-2xl font-bold">IT Helpdesk</h1>
                                </NavLink>
                                <p className="text-balance text-muted-foreground">
                                    Login to your account
                                </p>
                            </div>

                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="email"
                                            placeholder="email@example.com"
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
                                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                            <NavLink
                                                to="#"
                                                className="ml-auto text-xs underline-offset-2 hover:underline"
                                            >
                                                Forgot your password?
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
                                            <Spinner /> Login...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
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
                                            <Spinner /> Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <img src={GoogleSvg} alt="Google" className="size-4" />
                                            Login with Google
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
            <p className="px-6 text-center text-sm text-muted-foreground">
                Made by IT Ernaldi Bahar
            </p>
        </div>
    );
}
