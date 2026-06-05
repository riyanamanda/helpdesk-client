import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ROUTES } from "@/constants";
import { handleFormError } from "@/lib/handle-form-error";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCreateFeedbackMutation } from "../mutation/feedback.mutation";
import { FEEDBACK_QUERY_KEYS } from "../queries";
import type { FeedbackCreateFormData, FeedbackType } from "../types";

export function CreateFeedbackForm() {
    const { t } = useTranslation("feedback");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useCreateFeedbackMutation();

    const form = useForm<FeedbackCreateFormData>({
        defaultValues: {
            title: "",
            description: "",
            type: undefined,
        },
        mode: "onSubmit",
    });

    const TYPE_OPTIONS: { value: FeedbackType; label: string }[] = [
        { value: "FEATURE_REQUEST", label: t("type.FEATURE_REQUEST") },
        { value: "IMPROVEMENT", label: t("type.IMPROVEMENT") },
        { value: "BUG_REPORT", label: t("type.BUG_REPORT") },
    ];

    const onSubmit = (payload: FeedbackCreateFormData) => {
        mutate(payload, {
            onSuccess: async () => {
                toast.success(t("common:toast.success"), {
                    description: t("create.createdSuccess"),
                });
                await queryClient.invalidateQueries({ queryKey: FEEDBACK_QUERY_KEYS.ROOT });
                navigate(ROUTES.FEEDBACK.INDEX, { replace: true });
            },
            onError: (error) => {
                handleFormError(error as AxiosError, form);
            },
        });
    };

    return (
        <Card className="mx-auto max-w-lg">
            <CardHeader>
                <CardTitle>{t("create.cardTitle")}</CardTitle>
                <CardDescription>{t("common:form.fillRequired")}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="type"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="type">
                                        {t("create.typeLabel")}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Select
                                        value={field.value ?? ""}
                                        onValueChange={(v) => field.onChange(v as FeedbackType)}
                                    >
                                        <SelectTrigger id="type" className="w-full">
                                            <SelectValue
                                                placeholder={t("create.typePlaceholder")}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TYPE_OPTIONS.map((o) => (
                                                <SelectItem key={o.value} value={o.value}>
                                                    {o.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="title">
                                        {t("create.titleLabel")}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        autoComplete="off"
                                        placeholder={t("create.titlePlaceholder")}
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="description">
                                        {t("create.descriptionLabel")}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id={field.name}
                                        rows={4}
                                        placeholder={t("create.descriptionPlaceholder")}
                                        className="h-48"
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
                                onClick={() => navigate(ROUTES.FEEDBACK.INDEX)}
                            >
                                {t("common:actions.cancel")}
                            </Button>
                            <Button type="submit" variant="default" disabled={isPending}>
                                {t("common:actions.submit")}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
