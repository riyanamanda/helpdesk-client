import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { CreateCategoryForm } from "../components/CreateCategoryForm";

export function CategoryCreatePage() {
    return (
        <PageLayout>
            <PageHeader
                title="Create Category"
                description="Add new category"
            />

            <div>
                <CreateCategoryForm />
            </div>
        </PageLayout>
    );
}
