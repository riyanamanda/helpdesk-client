import { PageLayout } from "@/components/layout/PageLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { EditCategoryForm } from "../components/EditCategoryForm";
import { getCategoryQueryOption } from "../queries/category.query";

export function EditCategoryPage() {
    const { id } = useParams();
    const categoryId = Number(id);
    const { data: categoryData } = useSuspenseQuery(getCategoryQueryOption(categoryId));
    const category = categoryData.data;

    return (
        <PageLayout>
            <PageLayout.Header title="Edit Category" description="Edit a category information" />
            <PageLayout.Content>
                <EditCategoryForm id={categoryId} category={category} />
            </PageLayout.Content>
        </PageLayout>
    );
}
