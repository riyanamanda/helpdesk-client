import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "@/features/user/types";
import type { AxiosError } from "axios";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useRevokeGoogleMutation, useSyncGoogleMutation } from "../mutation/profile.mutation";

export function GoogleSyncCard({ user }: { user: User }) {
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
