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
import { listDivisionOptionsQueryOption } from "@/features/division/queries/division.query";
import { useDebounce } from "@/hooks/use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { OnChangeFn, SortingState } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { startTransition, useState } from "react";
import { NavLink } from "react-router";
import { getUserColumns } from "../config/userColumn";
import { listUserQueryOption } from "../queries/user.query";
import type { UserListParams, UserRole } from "../types";

type SortBy = NonNullable<UserListParams["sort_by"]>;
type SortType = NonNullable<UserListParams["sort_type"]>;

export function UserPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState<SortingState>([{ id: "created_at", desc: true }]);
    const [role, setRole] = useState<UserRole | undefined>(undefined);
    const [divisionId, setDivisionId] = useState<number | undefined>(undefined);
    const [isActive, setIsActive] = useState<boolean | undefined>(undefined);

    const { data: divisionOptionsData } = useQuery(listDivisionOptionsQueryOption());
    const divisionOptions = divisionOptionsData?.data ?? [];

    const debouncedSearch = useDebounce(search, 300);

    const sortBy = (sorting[0]?.id ?? "created_at") as SortBy;
    const sortType: SortType = sorting[0]?.desc !== false ? "DESC" : "ASC";

    const { data, isLoading } = useQuery({
        ...listUserQueryOption({
            page,
            limit,
            search: debouncedSearch || undefined,
            sort_by: sortBy,
            sort_type: sortType,
            role,
            division: divisionId,
            is_active: isActive,
        }),
        placeholderData: keepPreviousData,
    });

    const users = data?.data;
    const pagination = data?.meta.pagination;
    const columns = getUserColumns((page - 1) * limit);

    function handleSearchChange(value: string) {
        setSearch(value);
        setPage(1);
    }

    function handleRoleChange(value: string) {
        startTransition(() => {
            setRole(value === "all" ? undefined : (value as UserRole));
            setPage(1);
        });
    }

    function handleDivisionChange(value: string) {
        startTransition(() => {
            setDivisionId(value === "all" ? undefined : Number(value));
            setPage(1);
        });
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
                title="Users"
                description="All registered users in the system"
                actions={
                    <NavLink to={ROUTES.USER.CREATE}>
                        <Button variant="outline" className="cursor-pointer">
                            <PlusIcon />
                            Create new user
                        </Button>
                    </NavLink>
                }
            />
            <PageLayout.Content>
                <div className="flex flex-wrap items-center gap-2">
                    <Input
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="max-w-xs"
                    />
                    <Select
                        value={divisionId === undefined ? "all" : String(divisionId)}
                        onValueChange={handleDivisionChange}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Division" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Divisions</SelectItem>
                            {divisionOptions.map((d) => (
                                <SelectItem key={d.id} value={String(d.id)}>
                                    {d.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={role ?? "all"} onValueChange={handleRoleChange}>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="EMPLOYEE">Employee</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={isActive === undefined ? "all" : String(isActive)}
                        onValueChange={handleIsActiveChange}
                    >
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="true">Active</SelectItem>
                            <SelectItem value="false">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <DataTable
                    columns={columns}
                    data={users}
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
