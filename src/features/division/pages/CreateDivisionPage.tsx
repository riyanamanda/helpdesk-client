import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { CreateDivisionForm } from "../components/CreateDivisionForm";

export function DivisionCreatePage() {
    return (
        <PageLayout>
            <PageHeader title="Create Division" description="Add new division" />

            <div>
                <CreateDivisionForm />
            </div>
        </PageLayout>
    );
}
