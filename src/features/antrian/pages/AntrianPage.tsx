import { DataTable } from "@/components/DataTable";
import { DataTablePagination } from "@/components/DataTablePagination";
import { PageLayout } from "@/components/layout/PageLayout";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getAntrianColumns } from "../config/antrianColumn";
import { listAntrianQueryOptions } from "../queries/antrian.query";

export function AntrianPage() {
    const { t } = useTranslation("antrian");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [norm, setNorm] = useState("");

    const debouncedNorm = useDebounce(norm, 300);

    const handleNormChange = (value: string) => {
        setNorm(value);
        setPage(1);
    };

    const { data, isLoading } = useQuery({
        ...listAntrianQueryOptions({
            page,
            limit,
            norm: debouncedNorm || undefined,
        }),
        placeholderData: keepPreviousData,
    });

    const antrian = data?.data;
    const pagination = data?.pagination;
    const columns = getAntrianColumns(t, (page - 1) * limit);

    return (
        <PageLayout>
            <PageLayout.Header title={t("page.title")} description={t("page.description")} />
            <PageLayout.Content>
                <div className="flex flex-wrap items-center gap-2">
                    <Input
                        placeholder={t("page.searchPlaceholder")}
                        value={norm}
                        onChange={(e) => handleNormChange(e.target.value)}
                        className="max-w-xs"
                    />
                </div>

                <DataTable columns={columns} data={antrian} isLoading={isLoading} />

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
