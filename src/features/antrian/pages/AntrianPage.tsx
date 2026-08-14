import { DataTable } from "@/components/DataTable";
import { DataTablePagination } from "@/components/DataTablePagination";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useDebounce } from "@/hooks/use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RefreshCcwIcon } from "lucide-react";
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

    const { data, isLoading, isFetching, refetch } = useQuery({
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

                    <Button
                        variant="secondary"
                        size="sm"
                        className="ml-auto"
                        onClick={() => refetch()}
                    >
                        {isFetching ? (
                            <>
                                <Spinner /> Fetching...
                            </>
                        ) : (
                            <>
                                <RefreshCcwIcon />
                                Refetch
                            </>
                        )}
                    </Button>
                </div>

                <DataTable columns={columns} data={antrian} isLoading={isLoading} />

                {pagination && (
                    <DataTablePagination
                        pagination={pagination}
                        onPageChange={setPage}
                        onLimitChange={(l) => {
                            setLimit(l);
                            setPage(1);
                        }}
                    />
                )}
            </PageLayout.Content>
        </PageLayout>
    );
}
