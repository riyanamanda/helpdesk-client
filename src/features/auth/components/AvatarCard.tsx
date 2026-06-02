import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "@/features/user/types";
import { getInitials } from "@/lib/formatters";
import { resolveMediaUrl } from "@/lib/media-url";
import type { AxiosError } from "axios";
import { CameraIcon, MailIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { useUpdateAvatarMutation } from "../mutation/profile.mutation";

export function AvatarCard({ user }: { user: User }) {
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
                        <AvatarImage src={resolveMediaUrl(user.avatar_url)} alt={user.name} />
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
