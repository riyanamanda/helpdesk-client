import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { NavLink } from "react-router";
import { getCategoryColumns } from "../config/categoryColumn";
import { listCategoryQueryOption } from "../queries/category.query";

export function CategoryPage() {
    const { data: categoryData, isFetching } = useQuery(
        listCategoryQueryOption()
    );
    const categories = categoryData?.data;

    const columns = getCategoryColumns();

    if (isFetching) {
        return <PageLayout>Loading...</PageLayout>;
    }

    return (
        <PageLayout>
            <PageHeader
                title="Category"
                description="All listed provided categories"
                actions={
                    <NavLink to={ROUTES.CATEGORY.CREATE}>
                        <Button variant="outline" className="cursor-pointer">
                            <PlusIcon />
                            Create new category
                        </Button>
                    </NavLink>
                }
            />

            <DataTable columns={columns} data={categories} />
        </PageLayout>
    );
}
