import { DataTable } from "@/components/DataTable";
import { DataTablePagination } from "@/components/DataTablePagination";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ROUTES } from "@/constants";
import { useIsAdmin } from "@/hooks/use-current-user";
import { useDebounce } from "@/hooks/use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { OnChangeFn, SortingState } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { startTransition, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { getCategoryColumns } from "../config/categoryColumn";
import { listCategoryQueryOption } from "../queries/category.query";
import type { CategoryListParams } from "../types";

type SortBy = NonNullable<CategoryListParams["sort_by"]>;
type SortType = NonNullable<CategoryListParams["sort_type"]>;

export function CategoryPage() {
    const { t } = useTranslation("category");
    const isAdmin = useIsAdmin();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState<SortingState>([{ id: "created_at", desc: true }]);
    const [isActive, setIsActive] = useState<boolean | undefined>(undefined);

    const debouncedSearch = useDebounce(search, 300);

    const sortBy = (sorting[0]?.id ?? "created_at") as SortBy;
    const sortType: SortType = sorting[0]?.desc !== false ? "DESC" : "ASC";

    const { data, isLoading } = useQuery({
        ...listCategoryQueryOption({
            page,
            limit,
            search: debouncedSearch || undefined,
            sort_by: sortBy,
            sort_type: sortType,
            is_active: isActive,
        }),
        placeholderData: keepPreviousData,
    });

    const categories = data?.data;
    const pagination = data?.pagination;
    const columns = getCategoryColumns(t, (page - 1) * limit);

    function handleSearchChange(value: string) {
        setSearch(value);
        setPage(1);
    }

    function handleIsActiveChange(value: string) {
        startTransition(() => {
            setIsActive(value === "all" ? undefined : value === "true");
            setPage(1);
        });
    }

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
                title={t("page.title")}
                description={t("page.description")}
                actions={
                    isAdmin && (
                        <NavLink to={ROUTES.CATEGORY.CREATE}>
                            <Button variant="outline" className="cursor-pointer">
                                <PlusIcon />
                                {t("page.createButton")}
                            </Button>
                        </NavLink>
                    )
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
                    <Select
                        value={isActive === undefined ? "all" : String(isActive)}
                        onValueChange={handleIsActiveChange}
                    >
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder={t("common:table.status")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("filters.allStatus")}</SelectItem>
                            <SelectItem value="true">{t("common:status.active")}</SelectItem>
                            <SelectItem value="false">{t("common:status.inactive")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <DataTable
                    columns={columns}
                    data={categories}
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
