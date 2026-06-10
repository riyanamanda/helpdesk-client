import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
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
import { CircleQuestionMarkIcon, PaperclipIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCreateTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import type { TicketCreateFormData } from "../types";

export function CreateTicketForm() {
    const { t } = useTranslation("ticket");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useCreateTicketMutation();
    const [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { data: categoryOptionsData } = useQuery(listCategoryOptionsQueryOption());
    const categoryOptions = categoryOptionsData?.data ?? [];

    const form = useForm<TicketCreateFormData>({
        defaultValues: { title: "", description: "", category: undefined, division: undefined },
        mode: "onSubmit",
    });

    const onSubmit = (data: TicketCreateFormData) => {
        mutate(
            { data, file: file ?? undefined },
            {
                onSuccess: async () => {
                    toast.success(t("common:toast.success"), {
                        description: t("create.createdSuccess"),
                    });
                    await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
                    await queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.ROOT });
                    navigate(ROUTES.TICKET.INDEX, { replace: true });
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
                <CardTitle>{t("create.cardTitle")}</CardTitle>
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
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <CircleQuestionMarkIcon className="size-3.5 cursor-help text-muted-foreground" />
                                            </HoverCardTrigger>
                                            <HoverCardContent className="text-sm">
                                                {t("create.titleHint")}
                                                <br />
                                                <span className="text-muted-foreground">
                                                    {t("create.titleHintExample")}
                                                </span>
                                            </HoverCardContent>
                                        </HoverCard>
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
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <CircleQuestionMarkIcon className="size-3.5 cursor-help text-muted-foreground" />
                                            </HoverCardTrigger>
                                            <HoverCardContent className="text-sm">
                                                {t("create.descriptionHint")}
                                            </HoverCardContent>
                                        </HoverCard>
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
                                            <HoverCard>
                                                <HoverCardTrigger>
                                                    <CircleQuestionMarkIcon className="size-3.5 cursor-help text-muted-foreground" />
                                                </HoverCardTrigger>
                                                <HoverCardContent className="text-sm">
                                                    {t("create.categoryHint")}
                                                </HoverCardContent>
                                            </HoverCard>
                                        </FieldLabel>
                                        <Select
                                            value={field.value ? String(field.value) : ""}
                                            onValueChange={(v) => field.onChange(Number(v))}
                                        >
                                            <SelectTrigger id="category_id">
                                                <SelectValue
                                                    placeholder={t("common:form.selectCategory")}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="__none__">
                                                    {t("common:form.selectCategory")}
                                                </SelectItem>
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
                                            <HoverCard>
                                                <HoverCardTrigger>
                                                    <CircleQuestionMarkIcon className="size-3.5 cursor-help text-muted-foreground" />
                                                </HoverCardTrigger>
                                                <HoverCardContent className="text-sm">
                                                    {t("create.divisionHint")}
                                                </HoverCardContent>
                                            </HoverCard>
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

                        <Field>
                            <FieldLabel>{t("create.attachmentLabel")}</FieldLabel>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <PaperclipIcon />
                                    {file ? file.name : t("create.chooseImage")}
                                </Button>
                                {file && (
                                    <button
                                        type="button"
                                        className="cursor-pointer text-xs text-muted-foreground hover:text-destructive"
                                        onClick={() => {
                                            setFile(null);
                                            if (fileRef.current) fileRef.current.value = "";
                                        }}
                                    >
                                        {t("create.remove")}
                                    </button>
                                )}
                            </div>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            />
                            <p className="text-xs text-muted-foreground">
                                {t("create.imageConstraints")}
                            </p>
                        </Field>

                        <Field orientation="horizontal" className="justify-end">
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={isPending}
                                onClick={() => navigate(ROUTES.TICKET.INDEX)}
                            >
                                {t("common:actions.cancel")}
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {t("create.submitButton")}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
