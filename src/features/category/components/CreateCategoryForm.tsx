import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants";
import { handleFormError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCreateCategoryMutation } from "../mutation/category.mutation";
import { CATEGORY_QUERY_KEYS } from "../queries";
import type { CategoryRequest } from "../types";

export function CreateCategoryForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useCreateCategoryMutation();

    const form = useForm({
        defaultValues: {
            name: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = (payload: CategoryRequest) => {
        mutate(payload, {
            onSuccess: async () => {
                toast.success("Success", {
                    description: "Category created successfully",
                });
                await queryClient.invalidateQueries({
                    queryKey: CATEGORY_QUERY_KEYS.ROOT,
                });
                navigate(ROUTES.CATEGORY.INDEX, { replace: true });
            },
            onError: (error) => {
                handleFormError(error as AxiosError, form);
            },
        });
    };

    return (
        <Card className="mx-auto max-w-lg">
            <CardHeader>
                <CardTitle>Add New Category</CardTitle>
                <CardDescription>
                    Please fill all required field
                </CardDescription>
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
                                        placeholder="Hardware"
                                    />
                                    {fieldState.error && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Field orientation="horizontal" className="justify-end">
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={isPending}
                                onClick={() => navigate(ROUTES.CATEGORY.INDEX)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="default"
                                disabled={isPending}
                            >
                                Create
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
