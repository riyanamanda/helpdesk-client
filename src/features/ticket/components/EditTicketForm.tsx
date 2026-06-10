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
import { listCategoryOptionsQueryOption } from "@/features/category/queries/category.query";
import { DASHBOARD_QUERY_KEYS } from "@/features/dashboard/queries/dashboard.query";
import { DivisionCombobox } from "@/features/division/components/DivisionCombobox";
import { handleFormError } from "@/lib/handle-form-error";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useUpdateTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries/queryKeys";
import type { TicketDetail, TicketUpdateFormData } from "../types";

interface EditTicketFormProps {
    id: number;
    ticket: TicketDetail;
}

export function EditTicketForm({ id, ticket }: EditTicketFormProps) {
    const { t } = useTranslation("ticket");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: updateTicket, isPending } = useUpdateTicketMutation();

    const { data: categoryOptionsData } = useQuery(listCategoryOptionsQueryOption());
    const categoryOptions = categoryOptionsData?.data ?? [];

    const form = useForm<TicketUpdateFormData>({
        defaultValues: {
            title: ticket.title,
            description: ticket.description,
            category: ticket.category?.id,
            division: ticket.division?.id,
        },
        mode: "onSubmit",
    });

    const onSubmit = (payload: TicketUpdateFormData) => {
        updateTicket(
            { id, payload },
            {
                onSuccess: async () => {
                    toast.success(t("common:toast.success"), {
                        description: t("edit.savedSuccess"),
                    });
                    await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
                    await queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.ROOT });
                    navigate(ROUTES.TICKET.DETAIL.replace(":id", String(id)), { replace: true });
                },
                onError: (error) => {
                    handleFormError(error as AxiosError, form);
                },
            }
        );
    };

    return (
        <Card className="mx-auto max-w-2xl">
            <CardHeader>
                <CardTitle>{t("edit.cardTitle")}</CardTitle>
                <CardDescription>{t("common:form.fillRequired")}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
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
                                        maxLength={100}
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
                                        maxLength={255}
                                        className="h-48"
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="category"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="category">
                                            {t("create.categoryLabel")}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            value={field.value ? String(field.value) : ""}
                                            onValueChange={(v) => field.onChange(Number(v))}
                                        >
                                            <SelectTrigger id="category">
                                                <SelectValue
                                                    placeholder={t("common:form.selectCategory")}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categoryOptions.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={String(category.id)}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="division"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="division">
                                            {t("create.divisionLabel")}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <DivisionCombobox
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        <Field orientation="horizontal" className="justify-end">
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={isPending}
                                onClick={() =>
                                    navigate(ROUTES.TICKET.DETAIL.replace(":id", String(id)))
                                }
                            >
                                {t("common:actions.cancel")}
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {t("common:actions.save")}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
