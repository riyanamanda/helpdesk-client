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
import { listDivisionOptionsQueryOption } from "@/features/division/queries/division.query";
import { handleFormError } from "@/lib/handle-form-error";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCreateUserMutation } from "../mutation/user.mutation";
import { USER_QUERY_KEYS } from "../queries";
import type { UserFormData, UserRole } from "../types";

const ROLES: { label: string; value: UserRole }[] = [
    { label: "Admin", value: "ADMIN" },
    { label: "Employee", value: "EMPLOYEE" },
];

export function CreateUserForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useCreateUserMutation();

    const { data: divisionOptionData } = useQuery(listDivisionOptionsQueryOption());
    const divisionOptions = divisionOptionData?.data ?? [];

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
                toast.success("Success", {
                    description: "User created successfully",
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
                <CardTitle>Add New User</CardTitle>
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
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        autoComplete="off"
                                        placeholder="John Doe"
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
                                        Email
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="email"
                                        autoComplete="off"
                                        placeholder="john@example.com"
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
                                            Role
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger id="role">
                                                <SelectValue placeholder="Select role" />
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
                                            Division
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            value={field.value ? String(field.value) : ""}
                                            onValueChange={(v) => field.onChange(Number(v))}
                                        >
                                            <SelectTrigger id="division">
                                                <SelectValue placeholder="Select division" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="__none__">
                                                    Select a division
                                                </SelectItem>
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
                                        Gender
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Select
                                        value={field.value ?? ""}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MALE">Male</SelectItem>

                                            <SelectItem value="FEMALE">Female</SelectItem>
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
                                        Password
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
