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
import { ROUTES } from "@/constants";
import { DivisionCombobox } from "@/features/division/components/DivisionCombobox";
import { listRolesQueryOption } from "@/features/rbac/queries/rbac.query";
import { handleFormError } from "@/lib/handle-form-error";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCreateUserMutation } from "../mutation/user.mutation";
import { USER_QUERY_KEYS } from "../queries";
import type { UserFormData } from "../types";

export function CreateUserForm() {
    const { t } = useTranslation("user");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useCreateUserMutation();
    const { data: rolesData } = useQuery(listRolesQueryOption());
    const roles = rolesData?.data ?? [];

    const form = useForm<UserFormData>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: undefined,
            division: undefined,
            gender: undefined,
        },
        mode: "onSubmit",
    });

    const onSubmit = (payload: UserFormData) => {
        mutate(payload, {
            onSuccess: async () => {
                toast.success(t("common:toast.success"), {
                    description: t("create.createdSuccess"),
                });
                await queryClient.invalidateQueries({
                    queryKey: USER_QUERY_KEYS.ROOT,
                });
                navigate(ROUTES.USER.INDEX, { replace: true });
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
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        {t("create.emailLabel")}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="email"
                                        autoComplete="off"
                                        placeholder={t("create.emailPlaceholder")}
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="role"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="role">
                                            {t("create.roleLabel")}
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            value={field.value ? String(field.value) : ""}
                                            onValueChange={(v) => field.onChange(Number(v))}
                                        >
                                            <SelectTrigger id="role">
                                                <SelectValue placeholder={t("roles.placeholder")} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((r) => (
                                                    <SelectItem key={r.id} value={String(r.id)}>
                                                        {t(`roles.${r.code.toLowerCase()}`, r.code)}
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

                        <Controller
                            name="gender"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="gender">
                                        {t("common:gender.placeholder")}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Select
                                        value={field.value ?? ""}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger id="gender">
                                            <SelectValue
                                                placeholder={t("common:gender.placeholder")}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MALE">
                                                {t("common:gender.male")}
                                            </SelectItem>
                                            <SelectItem value="FEMALE">
                                                {t("common:gender.female")}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="password">
                                        {t("create.passwordLabel")}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="••••••••"
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
                                onClick={() => navigate(ROUTES.USER.INDEX)}
                            >
                                {t("common:actions.cancel")}
                            </Button>
                            <Button type="submit" variant="default" disabled={isPending}>
                                {t("common:actions.create")}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
