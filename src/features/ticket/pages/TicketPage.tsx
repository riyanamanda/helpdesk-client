import { DataTable } from "@/components/DataTable";
import { DataTablePagination } from "@/components/DataTablePagination";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { type SortingState } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { TicketFilters, type TicketFiltersState } from "../components/TicketFilters";
import { getTicketColumns } from "../config/ticketColumn";
import { listTicketQueryOption } from "../queries/ticket.query";
import type { SortType, TicketSortBy } from "../types";

export function TicketPage() {
    const { t, i18n } = useTranslation("ticket");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState<TicketFiltersState>({});
    const [sorting, setSorting] = useState<SortingState>([]);

    const handleFiltersChange = (next: TicketFiltersState) => {
        setFilters(next);
        setPage(1);
    };

    const handleSortingChange = (
        updater: SortingState | ((prev: SortingState) => SortingState)
    ) => {
        const next = typeof updater === "function" ? updater(sorting) : updater;
        setSorting(next);
        setPage(1);
    };

    const sort_by = sorting[0]?.id as TicketSortBy | undefined;
    const sort_type: SortType | undefined = sorting[0]
        ? sorting[0].desc
            ? "DESC"
            : "ASC"
        : undefined;

    const { data, isLoading } = useQuery({
        ...listTicketQueryOption({ page, limit, ...filters, sort_by, sort_type }),
        placeholderData: keepPreviousData,
    });

    const tickets = data?.data;
    const pagination = data?.pagination;
    const columns = getTicketColumns(t, (page - 1) * limit, i18n.resolvedLanguage);

    return (
        <PageLayout>
            <PageLayout.Header
                title={t("page.title")}
                description={t("page.description")}
                actions={
                    <NavLink to={ROUTES.TICKET.CREATE}>
                        <Button variant="outline" className="cursor-pointer">
                            <PlusIcon />
                            {t("page.submitButton")}
                        </Button>
                    </NavLink>
                }
            />
            <PageLayout.Content>
                <TicketFilters filters={filters} onFiltersChange={handleFiltersChange} />

                <DataTable
                    columns={columns}
                    data={tickets}
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
