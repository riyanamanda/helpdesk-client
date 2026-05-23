import { PageLayout } from "@/components/layout/PageLayout";
import { CreateDivisionForm } from "../components/CreateDivisionForm";

export function DivisionCreatePage() {
    return (
        <PageLayout>
            <PageLayout.Header title="Create Division" description="Add new division" />
            <PageLayout.Content>
                <CreateDivisionForm />
            </PageLayout.Content>
        </PageLayout>
    );
}
