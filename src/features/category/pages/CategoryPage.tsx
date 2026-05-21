import { PageLayout } from "@/components/layout/PageLayout";
import { formatDate } from "@/lib/formatters";
import { useQuery } from "@tanstack/react-query";
import { listCategoryQueryOption } from "../queries/category.query";
import type { Category } from "../types";

export function CategoryPage() {
    const { data: categoryData, isFetching } = useQuery(
        listCategoryQueryOption()
    );
    const categories = categoryData?.data;

    if (isFetching) {
        return <PageLayout>Loading...</PageLayout>;
    }

    return (
        <PageLayout>
            <div className="flex flex-col">
                {categories.map((category: Category) => (
                    <div className="inline-flex gap-4">
                        <div>{category.id}</div>
                        <div>{category.name}</div>
                        <div>{category.is_active}</div>
                        <div>{formatDate(category.created_at)}</div>
                        <div>{formatDate(category.updated_at)}</div>
                    </div>
                ))}
            </div>
        </PageLayout>
    );
}
