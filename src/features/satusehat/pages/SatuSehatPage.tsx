import { DataTable } from "@/components/DataTable";
import { DataTablePagination } from "@/components/DataTablePagination";
import { PageLayout } from "@/components/layout/PageLayout";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { type SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getPatientColumns } from "../config/patientColumn";
import { PatientFilters, type PatientFiltersState } from "../components/PatientFilters";
import { listPatientQueryOptions } from "../queries/ihs.query";
import type { PatientSortBy, SortType } from "../types";

export function SatuSehatPage() {
    const { t } = useTranslation("satuSehat");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<PatientFiltersState>({});

    const debouncedSearch = useDebounce(search, 300);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleFiltersChange = (next: PatientFiltersState) => {
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

    const sort_by = sorting[0]?.id as PatientSortBy | undefined;
    const sort_type: SortType | undefined = sorting[0]
        ? sorting[0].desc
            ? "DESC"
            : "ASC"
        : undefined;

    const { data, isLoading } = useQuery({
        ...listPatientQueryOptions({
            page,
            limit,
            search: debouncedSearch || undefined,
            ...filters,
            sort_by,
            sort_type,
        }),
        placeholderData: keepPreviousData,
    });

    const patients = data?.data;
    const pagination = data?.pagination;
    const columns = getPatientColumns(t, (page - 1) * limit);

    return (
        <PageLayout>
            <PageLayout.Header title={t("page.title")} description={t("page.description")} />
            <PageLayout.Content>
                <div className="flex flex-wrap items-center gap-2">
                    <Input
                        placeholder={t("page.searchPlaceholder")}
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="max-w-xs"
                    />
                    <PatientFilters filters={filters} onFiltersChange={handleFiltersChange} />
                </div>

                <DataTable
                    columns={columns}
                    data={patients}
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
