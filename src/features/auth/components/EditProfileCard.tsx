import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "@/features/user/types";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "../mutation/profile.mutation";
import type { UpdateProfileRequest } from "../types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function EditProfileCard({ user }: { user: User }) {
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
                onError: (error) => {
                    const axiosError = error as AxiosError<{ error: { message: string } }>;
                    toast.error(
                        axiosError.response?.data?.error?.message ?? "Failed to update profile"
                    );
                },
            }
        );
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Edit Profile</CardTitle>
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
                                        Name <span className="text-destructive">*</span>
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
                                        Email <span className="text-destructive">*</span>
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
                                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                                        <Input
                                            {...field}
                                            value={field.value ?? ""}
                                            id={field.name}
                                            placeholder="+62..."
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
                                        <Spinner /> Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
