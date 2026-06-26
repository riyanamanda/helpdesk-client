import { DataTable } from "@/components/DataTable";
import { DataTablePagination } from "@/components/DataTablePagination";
import { DeleteDialog } from "@/components/DeleteDialog";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { type SortingState } from "@tanstack/react-table";
import { SendIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { PatientFilters, type PatientFiltersState } from "../components/PatientFilters";
import { getPatientColumns } from "../config/patientColumn";
import { useSendIhsMutation } from "../mutation/ihs.mutation";
import { listPatientQueryOptions } from "../queries/patient.query";
import type { HttpMethod, PatientSortBy, SortType } from "../types";

export function PatientPage() {
    const { t } = useTranslation("ihs");
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "10");
    const search = searchParams.get("search") ?? "";
    const sortById = searchParams.get("sort_by") ?? "";
    const sortDesc = searchParams.get("sort_desc") === "true";
    const httpMethod = (searchParams.get("http_method") as HttpMethod) || undefined;

    const sorting: SortingState = sortById ? [{ id: sortById, desc: sortDesc }] : [];
    const filters: PatientFiltersState = { http_method: httpMethod };

    const debouncedSearch = useDebounce(search, 300);

    function update(changes: Record<string, string | null>, resetPage = false) {
        setSearchParams(
            (prev) => {
                for (const [key, value] of Object.entries(changes)) {
                    if (value === null || value === "") prev.delete(key);
                    else prev.set(key, value);
                }
                if (resetPage) prev.delete("page");
                return prev;
            },
            { replace: true }
        );
    }

    function handleSearchChange(value: string) {
        update({ search: value || null }, true);
    }

    function handleFiltersChange(next: PatientFiltersState) {
        update({ http_method: next.http_method ?? null }, true);
    }

    function handleSortingChange(updater: SortingState | ((prev: SortingState) => SortingState)) {
        const next = typeof updater === "function" ? updater(sorting) : updater;
        if (next[0]) {
            update({ sort_by: next[0].id, sort_desc: String(next[0].desc) }, true);
        } else {
            update({ sort_by: null, sort_desc: null }, true);
        }
    }

    const sort_by = sortById as PatientSortBy | undefined;
    const sort_type: SortType | undefined = sortById ? (sortDesc ? "DESC" : "ASC") : undefined;

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

    const { mutate: sendingIHS, isPending: isSending } = useSendIhsMutation();
    const handleSendIHS = () => {
        sendingIHS(undefined, {
            onSuccess: () => {
                toast.success(t("common:toast.success"), {
                    description: t("detail.sendIhs.success"),
                });
            },
        });
    };

    return (
        <PageLayout>
            <PageLayout.Header
                title={t("page.title")}
                description={t("page.description")}
                actions={
                    <DeleteDialog
                        title={t("detail.sendDialog.title")}
                        description={t("detail.sendDialog.description")}
                        confirmLabel={t("detail.sendDialog.confirm")}
                        pendingLabel={t("detail.sendDialog.creating")}
                        icon={<SendIcon />}
                        isPending={isSending}
                        onConfirm={handleSendIHS}
                        trigger={
                            <Button variant="destructive" size="sm" disabled={isSending}>
                                <SendIcon />
                                <span>{t("detail.sendDialog.button")}</span>
                            </Button>
                        }
                    />
                }
            />
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
                        onPageChange={(p) => update({ page: String(p) })}
                        onLimitChange={(l) => update({ limit: String(l), page: null })}
                    />
                )}
            </PageLayout.Content>
        </PageLayout>
    );
}
