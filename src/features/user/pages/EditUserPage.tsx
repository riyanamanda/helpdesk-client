import { PageLayout } from "@/components/layout/PageLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { EditUserForm } from "../components/EditUserForm";
import { getUserQueryOption } from "../queries/user.query";

export function EditUserPage() {
    const { id } = useParams();
    const { data } = useSuspenseQuery(getUserQueryOption(id!));
    const user = data.data;

    return (
        <PageLayout>
            <PageLayout.Header title="Edit User" description="Update user account details" />
            <PageLayout.Content>
                <EditUserForm user={user} />
            </PageLayout.Content>
        </PageLayout>
    );
}
