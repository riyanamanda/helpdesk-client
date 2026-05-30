import { PageLayout } from "@/components/layout/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { AvatarCard } from "../components/AvatarCard";
import { EditProfileCard } from "../components/EditProfileCard";
import { GoogleSyncCard } from "../components/GoogleSyncCard";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { profileQueryOption } from "../queries/profile.query";

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
