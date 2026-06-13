import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "@/features/user/types";
import { type AxiosError } from "axios";
import { handleFormError } from "@/lib/handle-form-error";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUpdateProfileMutation } from "../mutation/profile.mutation";
import type { UpdateProfileRequest } from "../types";

export function EditProfileCard({ user }: { user: User }) {
    const { t } = useTranslation("auth");
    const { mutate: updateProfile, isPending } = useUpdateProfileMutation();

    const form = useForm<UpdateProfileRequest>({
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone ?? "",
            gender: user.gender,
        },
    });

    const onSubmit = (data: UpdateProfileRequest) => {
        updateProfile(
            { name: data.name, email: data.email, phone: data.phone, gender: data.gender || null },
            {
                onError: (error) => handleFormError(error as AxiosError, form),
            }
        );
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">{t("profile.editTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>
                                        {t("profile.nameLabel")}{" "}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input {...field} id={field.name} autoComplete="off" />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>
                                        {t("profile.emailLabel")}{" "}
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input {...field} id={field.name} autoComplete="off" />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="phone"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>
                                            {t("profile.phoneLabel")}
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            value={field.value ?? ""}
                                            id={field.name}
                                            placeholder={t("profile.phonePlaceholder")}
                                            autoComplete="off"
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
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
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                        <Field orientation="horizontal" className="justify-end">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Spinner /> {t("profile.saving")}
                                    </>
                                ) : (
                                    t("profile.saveChanges")
                                )}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
