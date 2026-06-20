import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "@/features/user/types";
import { getInitials } from "@/lib/formatters";
import { resolveMediaUrl } from "@/lib/media-url";
import { handleApiError } from "@/lib/handle-form-error";
import { ROLE_META } from "@/lib/role";
import { CameraIcon, MailIcon } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useUpdateAvatarMutation } from "../mutation/profile.mutation";

export function AvatarCard({ user }: { user: User }) {
    const fileRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation("auth");
    const { mutate: updateAvatar, isPending } = useUpdateAvatarMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error(t("profile.fileTooLarge"), {
                description: t("profile.fileTooLargeDescription"),
            });
            return;
        }

        updateAvatar(file, {
            onError: (error) => handleApiError(error),
        });

        e.target.value = "";
    };

    const { label: roleLabel, className: roleBadgeClass } = ROLE_META[user.role.name];

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
                        <Badge className={roleBadgeClass}>{roleLabel}</Badge>
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
