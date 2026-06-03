import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants";
import { handleFormError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useUpdateCategoryMutation } from "../mutation/category.mutation";
import { CATEGORY_QUERY_KEYS } from "../queries";
import type { Category, CategoryFormData } from "../types";

interface EditCategoryFormProps {
    id: number;
    category: Category;
}

export function EditCategoryForm({ id, category }: EditCategoryFormProps) {
    const { t } = useTranslation("category");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: updateCategory, isPending } = useUpdateCategoryMutation();

    const form = useForm<CategoryFormData>({
        defaultValues: {
            name: category.name,
            is_active: category.is_active,
        },
        mode: "onSubmit",
    });

    const onSubmit = (payload: CategoryFormData) => {
        updateCategory(
            { id, payload },
            {
                onSuccess: async () => {
                    toast.success(t("common:toast.success"), {
                        description: t("edit.savedSuccess"),
                    });
                    await queryClient.invalidateQueries({
                        queryKey: CATEGORY_QUERY_KEYS.ROOT,
                    });
                    navigate(ROUTES.CATEGORY.INDEX, { replace: true });
                },
                onError: (error) => {
                    handleFormError(error as AxiosError, form);
                },
            }
        );
    };

    return (
        <Card className="mx-auto max-w-lg">
            <CardHeader>
                <CardTitle>{t("edit.cardTitle")}</CardTitle>
                <CardDescription>{t("common:form.fillRequired")}</CardDescription>
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
                                        {t("create.nameLabel")}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        autoComplete="off"
                                        placeholder={t("create.namePlaceholder")}
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="is_active"
                            control={form.control}
                            render={({ field }) => (
                                <Field orientation="horizontal" className="items-center gap-2">
                                    <Checkbox
                                        id={field.name}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />

                                    <FieldLabel htmlFor={field.name}>
                                        {t("edit.activeLabel")}
                                    </FieldLabel>
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
                                {t("common:actions.cancel")}
                            </Button>
                            <Button type="submit" variant="default" disabled={isPending}>
                                {t("common:actions.save")}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
