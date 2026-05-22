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
import { getDivisionColumns } from "../config/divisionColumn";
import { listDivisionQueryOption } from "../queries/division.query";

export function DivisionPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data, isLoading } = useQuery(listDivisionQueryOption({ page, limit }));

    const divisions = data?.data;
    const pagination = data?.meta.pagination;
    const columns = getDivisionColumns((page - 1) * limit);

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
                title="Division"
                description="All listed provided divisions"
                actions={
                    <NavLink to={ROUTES.DIVISION.CREATE}>
                        <Button variant="outline" className="cursor-pointer">
                            <PlusIcon />
                            Create new division
                        </Button>
                    </NavLink>
                }
            />

            <DataTable columns={columns} data={divisions} />

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
