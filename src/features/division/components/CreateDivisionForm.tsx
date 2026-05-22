import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants";
import { handleFormError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCreateDivisionMutation } from "../mutation/division.mutation";
import { DIVISION_QUERY_KEYS } from "../queries";
import type { DivisionFormData } from "../types";

export function CreateDivisionForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useCreateDivisionMutation();

    const form = useForm({
        defaultValues: {
            name: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = (payload: Pick<DivisionFormData, "name">) => {
        mutate(payload, {
            onSuccess: async () => {
                toast.success("Success", {
                    description: "Division created successfully",
                });
                await queryClient.invalidateQueries({
                    queryKey: DIVISION_QUERY_KEYS.ROOT,
                });
                navigate(ROUTES.DIVISION.INDEX, { replace: true });
            },
            onError: (error) => {
                handleFormError(error as AxiosError, form);
            },
        });
    };

    return (
        <Card className="mx-auto max-w-lg">
            <CardHeader>
                <CardTitle>Add New Division</CardTitle>
                <CardDescription>Please fill all required fields</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="name">
                                        Name
                                        <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        autoComplete="off"
                                        placeholder="Engineering"
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Field orientation="horizontal" className="justify-end">
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={isPending}
                                onClick={() => navigate(ROUTES.DIVISION.INDEX)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant="default" disabled={isPending}>
                                Create
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
