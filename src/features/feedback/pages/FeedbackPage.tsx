import { DataTable } from "@/components/DataTable";
import { DataTablePagination } from "@/components/DataTablePagination";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { useIsAdmin } from "@/hooks/use-current-user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { OnChangeFn, SortingState } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { startTransition, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { FeedbackFilters, type FeedbackFiltersState } from "../components/FeedbackFilters";
import { getFeedbackColumns } from "../config/feedbackColumn";
import { listAdminFeedbackQueryOption, listFeedbackQueryOption } from "../queries/feedback.query";
import type { FeedbackSortBy, SortType } from "../types";

export function FeedbackPage() {
    const { t } = useTranslation("feedback");
    const isAdmin = useIsAdmin();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState<FeedbackFiltersState>({});
    const [sorting, setSorting] = useState<SortingState>([{ id: "created_at", desc: true }]);

    const sortBy = (sorting[0]?.id ?? "created_at") as FeedbackSortBy;
    const sortType: SortType = sorting[0]?.desc !== false ? "DESC" : "ASC";

    const queryParams = { page, limit, sort_by: sortBy, sort_type: sortType, ...filters };

    const { data, isLoading } = useQuery({
        ...(isAdmin
            ? listAdminFeedbackQueryOption(queryParams)
            : listFeedbackQueryOption(queryParams)),
        placeholderData: keepPreviousData,
    });

    const feedbacks = data?.data;
    const pagination = data?.pagination;
    const columns = getFeedbackColumns(t, (page - 1) * limit, isAdmin);

    const handleFiltersChange = (next: FeedbackFiltersState) => {
        setFilters(next);
        setPage(1);
    };

    const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
        startTransition(() => {
            setSorting(
                typeof updaterOrValue === "function" ? updaterOrValue(sorting) : updaterOrValue
            );
            setPage(1);
        });
    };

    return (
        <PageLayout>
            <PageLayout.Header
                title={isAdmin ? t("page.titleAdmin") : t("page.title")}
                description={isAdmin ? t("page.descriptionAdmin") : t("page.description")}
                actions={
                    <NavLink to={ROUTES.FEEDBACK.CREATE}>
                        <Button variant="outline" className="cursor-pointer">
                            <PlusIcon />
                            {t("page.createButton")}
                        </Button>
                    </NavLink>
                }
            />
            <PageLayout.Content>
                <FeedbackFilters filters={filters} onFiltersChange={handleFiltersChange} />

                <DataTable
                    columns={columns}
                    data={feedbacks}
                    isLoading={isLoading}
                    sorting={sorting}
                    onSortingChange={handleSortingChange}
                />

                {pagination && (
                    <DataTablePagination
                        pagination={pagination}
                        onPageChange={setPage}
                        onLimitChange={setLimit}
                    />
                )}
            </PageLayout.Content>
        </PageLayout>
    );
}
