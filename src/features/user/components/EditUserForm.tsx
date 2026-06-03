import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ROUTES } from "@/constants";
import { listDivisionOptionsQueryOption } from "@/features/division/queries/division.query";
import { handleFormError } from "@/lib/handle-form-error";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../mutation/user.mutation";
import { USER_QUERY_KEYS } from "../queries";
import type { User, UserFormData, UserGender, UserRole } from "../types";

interface EditUserFormProps {
    user: User;
}

export function EditUserForm({ user }: EditUserFormProps) {
    const { t } = useTranslation("user");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending } = useUpdateUserMutation();

    const ROLES: { label: string; value: UserRole }[] = [
        { label: t("roles.admin"), value: "ADMIN" },
        { label: t("roles.employee"), value: "EMPLOYEE" },
    ];

    const { data: divisionOptionsData } = useQuery(listDivisionOptionsQueryOption());
    const divisionOptions = divisionOptionsData?.data ?? [];

    const form = useForm<Omit<UserFormData, "password">>({
        defaultValues: {
            name: user.name,
            email: user.email,
            role: user.role,
            division: user.division.id,
            gender: user.gender,
            is_active: user.is_active,
        },
        mode: "onSubmit",
    });

    const onSubmit = (payload: Omit<UserFormData, "password">) => {
        updateUser(
            { id: user.id, payload: { ...payload, is_active: payload.is_active === true } },
            {
                onSuccess: async () => {
                    toast.success(t("common:toast.success"), {
                        description: t("edit.updatedSuccess"),
                    });
                    await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.ROOT });
                    navigate(ROUTES.USER.INDEX, { replace: true });
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
                <CardDescription>{t("edit.cardDescription", { name: user.name })}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            rules={{ required: t("edit.nameRequired") }}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="name">
                                        {t("edit.nameLabel")}{" "}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input {...field} id="name" autoComplete="off" />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="email"
                            control={form.control}
                            rules={{ required: t("edit.emailRequired") }}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        {t("edit.emailLabel")}{" "}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input {...field} id="email" type="email" autoComplete="off" />
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
                                            {t("edit.roleLabel")}
                                        </FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger id="role">
                                                <SelectValue placeholder={t("roles.placeholder")} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {ROLES.map((r) => (
                                                    <SelectItem key={r.value} value={r.value}>
                                                        {r.label}
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
                                            {t("edit.divisionLabel")}
                                        </FieldLabel>
                                        <Select
                                            value={field.value ? String(field.value) : ""}
                                            onValueChange={(v) => field.onChange(Number(v))}
                                        >
                                            <SelectTrigger id="division">
                                                <SelectValue
                                                    placeholder={t("create.divisionPlaceholder")}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {divisionOptions.map((d) => (
                                                    <SelectItem key={d.id} value={String(d.id)}>
                                                        {d.name}
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
                        </div>

                        <Controller
                            name="gender"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="gender">
                                        {t("common:gender.placeholder")}
                                    </FieldLabel>
                                    <Select
                                        value={field.value ?? ""}
                                        onValueChange={(v) => field.onChange(v as UserGender)}
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
                            name="is_active"
                            control={form.control}
                            render={({ field }) => (
                                <Field orientation="horizontal">
                                    <Checkbox
                                        id="is_active"
                                        checked={field.value}
                                        onCheckedChange={(checked) =>
                                            field.onChange(checked === true)
                                        }
                                    />
                                    <FieldContent>
                                        <FieldLabel htmlFor="is_active">
                                            {t("edit.activeLabel")}
                                        </FieldLabel>
                                        <FieldDescription>
                                            {t("edit.activeDescription")}
                                        </FieldDescription>
                                    </FieldContent>
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
                            <Button type="submit" disabled={isPending}>
                                {t("edit.saveChanges")}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
