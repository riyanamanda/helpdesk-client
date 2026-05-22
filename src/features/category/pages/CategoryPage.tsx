import { DataTable } from "@/components/DataTable";
import { DataTablePagination } from "@/components/DataTablePagination";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { getCategoryColumns } from "../config/categoryColumn";
import { listCategoryQueryOption } from "../queries/category.query";

export function CategoryPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data, isLoading } = useQuery(listCategoryQueryOption({ page, limit }));

    const categories = data?.data;
    const pagination = data?.meta.pagination;
    const columns = getCategoryColumns((page - 1) * limit);

    if (isLoading) {
        return (
            <PageLayout>
                <div className="my-4 flex flex-col gap-4">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </PageLayout>
        );
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

            {pagination && (
                <DataTablePagination
                    pagination={pagination}
                    onPageChange={setPage}
                    onLimitChange={setLimit}
                />
            )}
        </PageLayout>
    );
}
