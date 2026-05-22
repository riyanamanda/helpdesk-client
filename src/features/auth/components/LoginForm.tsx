import { AuthPlaceholder } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants";
import { handleFormError } from "@/lib/handle-form-error";
import { cn } from "@/lib/utils";
import type { AxiosError } from "axios";
import type { ComponentProps } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { useLoginMutation } from "../mutation/login.mutation";
import type { LoginRequest } from "../types";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
    const { mutate: login, isPending } = useLoginMutation();

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
                                    Login
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>
                            <Field>
                                <Button variant="outline" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with Google
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src={AuthPlaceholder}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
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
