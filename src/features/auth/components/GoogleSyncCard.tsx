import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "@/features/user/types";
import type { AxiosError } from "axios";
import { LinkIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useRevokeGoogleMutation, useSyncGoogleMutation } from "../mutation/profile.mutation";

export function GoogleSyncCard({ user }: { user: User }) {
    const { t } = useTranslation("auth");
    const { mutate: syncGoogle, isPending } = useSyncGoogleMutation();
    const { mutate: revokeGoogle, isPending: revokePending } = useRevokeGoogleMutation();

    const handleSync = () => {
        syncGoogle(undefined, {
            onError: (error) => {
                const axiosError = error as AxiosError<{ error: { message: string } }>;
                toast.error(axiosError.response?.data?.error?.message ?? t("google.failedLink"));
            },
        });
    };

    const handleRevoke = () => {
        revokeGoogle(undefined, {
            onError: (error) => {
                const axiosError = error as AxiosError<{ error: { message: string } }>;
                toast.error(axiosError.response?.data?.error?.message ?? t("google.failedUnlink"));
            },
        });
    };

    const isLinked = !!user.google_id;

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">{t("google.cardTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                            <LinkIcon className="size-4 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium">
                                {isLinked ? t("google.linked") : t("google.notLinked")}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {isLinked ? t("google.linkedDesc") : t("google.notLinkedDesc")}
                            </span>
                        </div>
                    </div>
                    {isLinked ? (
                        <DeleteDialog
                            title={t("google.unlinkTitle")}
                            description={t("google.unlinkDescription")}
                            confirmLabel={t("google.unlinkConfirm")}
                            pendingLabel={t("google.unlinking")}
                            icon={<LinkIcon />}
                            isPending={revokePending}
                            onConfirm={handleRevoke}
                            trigger={
                                <Button variant="destructive" size="sm" className="shrink-0">
                                    {t("google.unlinkButton")}
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
                                    <Spinner /> {t("google.linking")}
                                </>
                            ) : (
                                t("google.linkButton")
                            )}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
