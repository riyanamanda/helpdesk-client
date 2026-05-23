import { PageLayout } from "@/components/layout/PageLayout";
import { CreateCategoryForm } from "../components/CreateCategoryForm";

export function CategoryCreatePage() {
    return (
        <PageLayout>
            <PageLayout.Header title="Create Category" description="Add new category" />
            <PageLayout.Content>
                <CreateCategoryForm />
            </PageLayout.Content>
        </PageLayout>
    );
}
