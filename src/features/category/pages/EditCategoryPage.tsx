import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { EditCategoryForm } from "../components/EditCategoryForm";
import { getCategoryQueryOption } from "../queries/category.query";

export function EditCategoryPage() {
    const { id } = useParams();
    const categoryId = Number(id);
    const { data: categoryData, isLoading } = useQuery(getCategoryQueryOption(categoryId));
    const category = categoryData?.data;

    return (
        <PageLayout>
            <PageHeader title="Edit Category" description="Edit a category information" />
            <div>
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <Spinner />
                    </div>
                ) : category ? (
                    <EditCategoryForm id={categoryId} category={category} />
                ) : null}
            </div>
        </PageLayout>
    );
}
