import { PageLayout } from "@/components/layout/PageLayout";
import { DeleteDialog } from "@/components/DeleteDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "@/features/user/types";
import { getInitials } from "@/lib/formatters";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { CameraIcon, LinkIcon, MailIcon } from "lucide-react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    useRevokeGoogleMutation,
    useSyncGoogleMutation,
    useUpdateAvatarMutation,
    useUpdateProfileMutation,
} from "../mutation/profile.mutation";
import { profileQueryOption } from "../queries/profile.query";
import type { UpdateProfileRequest } from "../types";

function ProfileSkeleton() {
    return (
        <div className="mx-auto max-w-2xl space-y-4">
            <Card>
                <CardContent className="flex items-center gap-6 pt-6 pb-6">
                    <Skeleton className="size-20 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="space-y-4 pt-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-9 w-28" />
                </CardContent>
            </Card>
        </div>
    );
}

function AvatarCard({ user }: { user: User }) {
    const fileRef = useRef<HTMLInputElement>(null);
    const { mutate: updateAvatar, isPending } = useUpdateAvatarMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error("File too large", { description: "Max size is 2MB" });
            return;
        }

        updateAvatar(file, {
            onError: (error) => {
                const axiosError = error as AxiosError<{ error: { message: string } }>;
                toast.error(axiosError.response?.data?.error?.message ?? "Failed to update avatar");
            },
        });

        e.target.value = "";
    };

    const roleLabel = user.role === "ADMIN" ? "Admin" : "Employee";

    return (
        <Card>
            <CardContent className="flex items-center gap-6 pt-6 pb-6">
                <div className="relative">
                    <Avatar className="size-20 text-2xl">
                        <AvatarImage src={user.avatar_url ?? undefined} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <button
                        type="button"
                        disabled={isPending}
                        onClick={() => fileRef.current?.click()}
                        className="absolute -right-1 -bottom-1 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 border-background bg-muted text-muted-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <Spinner className="size-3" />
                        ) : (
                            <CameraIcon className="size-3" />
                        )}
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <h2 className="text-lg font-bold">{user.name}</h2>
                    <div className="flex items-center gap-2">
                        <Badge
                            className={
                                user.role === "ADMIN"
                                    ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                                    : "bg-secondary text-secondary-foreground"
                            }
                        >
                            {roleLabel}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{user.division.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MailIcon className="size-3" />
                        {user.email}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function EditProfileCard({ user }: { user: User }) {
    const { mutate: updateProfile, isPending } = useUpdateProfileMutation();

    const form = useForm<UpdateProfileRequest>({
        defaultValues: {
            name: user.name,
            phone: user.phone ?? "",
        },
    });

    const onSubmit = (data: UpdateProfileRequest) => {
        updateProfile(
            { name: data.name, phone: data.phone || null },
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
                            rules={{
                                required: "Name is required",
                                minLength: { value: 2, message: "Min 2 characters" },
                            }}
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
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
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

function GoogleSyncCard({ user }: { user: User }) {
    const { mutate: syncGoogle, isPending } = useSyncGoogleMutation();
    const { mutate: revokeGoogle, isPending: revokePending } = useRevokeGoogleMutation();

    const handleSync = () => {
        syncGoogle(undefined, {
            onError: (error) => {
                const axiosError = error as AxiosError<{ error: { message: string } }>;
                toast.error(
                    axiosError.response?.data?.error?.message ?? "Failed to link Google account"
                );
            },
        });
    };

    const handleRevoke = () => {
        revokeGoogle(undefined, {
            onError: (error) => {
                const axiosError = error as AxiosError<{ error: { message: string } }>;
                toast.error(
                    axiosError.response?.data?.error?.message ?? "Failed to unlink Google Account"
                );
            },
        });
    };

    const isLinked = !!user.google_id;

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Google Account</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                            <LinkIcon className="size-4 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium">
                                {isLinked ? "Google account linked" : "No Google account linked"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {isLinked
                                    ? "You can sign in with Google"
                                    : "Link your Google account to enable Google sign-in"}
                            </span>
                        </div>
                    </div>
                    {isLinked ? (
                        <DeleteDialog
                            title="Unlink Google Account"
                            description="Are you sure you want to unlink your Google account? You won't be able to sign in with Google until you link it again."
                            confirmLabel="Unlink"
                            pendingLabel="Unlinking..."
                            icon={<LinkIcon />}
                            isPending={revokePending}
                            onConfirm={handleRevoke}
                            trigger={
                                <Button variant="destructive" size="sm" className="shrink-0">
                                    Unlink Google
                                </Button>
                            }
                        />
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            className="shrink-0"
                            disabled={isPending}
                            onClick={handleSync}
                        >
                            {isPending ? (
                                <>
                                    <Spinner /> Linking...
                                </>
                            ) : (
                                "Link Google"
                            )}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export function ProfilePage() {
    const { data: profileData, isLoading } = useQuery(profileQueryOption());
    const user = profileData?.data;

    return (
        <PageLayout>
            <PageLayout.Header title="Profile" description="Manage your account" />
            <PageLayout.Content>
                {isLoading || !user ? (
                    <ProfileSkeleton />
                ) : (
                    <div className="mx-auto max-w-2xl space-y-4">
                        <AvatarCard user={user} />
                        <EditProfileCard user={user} />
                        <GoogleSyncCard user={user} />
                    </div>
                )}
            </PageLayout.Content>
        </PageLayout>
    );
}
