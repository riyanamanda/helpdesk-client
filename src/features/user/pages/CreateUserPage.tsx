import { PageLayout } from "@/components/layout/PageLayout";
import { CreateUserForm } from "../components/CreateUserForm";

export function CreateUserPage() {
    return (
        <PageLayout>
            <PageLayout.Header title="Create User" description="Add a new user to the system" />
            <PageLayout.Content>
                <CreateUserForm />
            </PageLayout.Content>
        </PageLayout>
    );
}
