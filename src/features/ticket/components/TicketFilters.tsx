import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { listCategoryOptionsQueryOption } from "@/features/category/queries/category.query";
import { listDivisionOptionsQueryOption } from "@/features/division/queries/division.query";
import { listAssignableUserQueryOption } from "@/features/user/queries/user.query";
import { useIsAdmin } from "@/hooks/use-current-user";
import { useQuery } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { TicketListParams, TicketPriority, TicketStatus } from "../types";

export type TicketFiltersState = Pick<
    TicketListParams,
    "status" | "priority" | "category_id" | "division_id" | "assigned_to_id"
>;

interface TicketFiltersProps {
    filters: TicketFiltersState;
    onFiltersChange: (filters: TicketFiltersState) => void;
}

export function TicketFilters({ filters, onFiltersChange }: TicketFiltersProps) {
    const { t } = useTranslation("ticket");
    const isAdmin = useIsAdmin();

    const STATUS_OPTIONS: { value: TicketStatus; label: string }[] = [
        { value: "OPEN", label: t("status.OPEN") },
        { value: "IN_PROGRESS", label: t("status.IN_PROGRESS") },
        { value: "RESOLVED", label: t("status.RESOLVED") },
        { value: "CLOSED", label: t("status.CLOSED") },
    ];

    const PRIORITY_OPTIONS: { value: TicketPriority; label: string }[] = [
        { value: "LOW", label: t("priority.LOW") },
        { value: "MEDIUM", label: t("priority.MEDIUM") },
        { value: "HIGH", label: t("priority.HIGH") },
        { value: "URGENT", label: t("priority.URGENT") },
    ];

    const { data: categoryOptionsData } = useQuery(listCategoryOptionsQueryOption());
    const { data: divisionOptionsData } = useQuery(listDivisionOptionsQueryOption());
    const { data: usersData } = useQuery({ ...listAssignableUserQueryOption(), enabled: isAdmin });

    const categoryOptions = categoryOptionsData?.data ?? [];
    const divisionOptions = divisionOptionsData?.data ?? [];
    const users = usersData?.data ?? [];

    const hasActiveFilters = Object.values(filters).some((v) => v !== undefined);

    const set = <K extends keyof TicketFiltersState>(key: K, value: TicketFiltersState[K]) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const clear = () => onFiltersChange({});

    return (
        <div className="flex flex-wrap items-center gap-2">
            <Select
                value={filters.status ?? "all"}
                onValueChange={(v) => set("status", v === "all" ? undefined : (v as TicketStatus))}
            >
                <SelectTrigger className="h-8 w-36 text-xs">
                    <SelectValue placeholder={t("status.allStatuses")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t("status.allStatuses")}</SelectItem>
                    {STATUS_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                            {o.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.priority ?? "all"}
                onValueChange={(v) =>
                    set("priority", v === "all" ? undefined : (v as TicketPriority))
                }
            >
                <SelectTrigger className="h-8 w-36 text-xs">
                    <SelectValue placeholder={t("priority.allPriorities")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t("priority.allPriorities")}</SelectItem>
                    {PRIORITY_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                            {o.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.category_id !== undefined ? String(filters.category_id) : "all"}
                onValueChange={(v) => set("category_id", v === "all" ? undefined : Number(v))}
            >
                <SelectTrigger className="h-8 w-40 text-xs">
                    <SelectValue placeholder={t("filters.allCategories")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t("filters.allCategories")}</SelectItem>
                    {categoryOptions.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                            {c.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.division_id !== undefined ? String(filters.division_id) : "all"}
                onValueChange={(v) => set("division_id", v === "all" ? undefined : Number(v))}
            >
                <SelectTrigger className="h-8 w-40 text-xs">
                    <SelectValue placeholder={t("filters.allRooms")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t("filters.allRooms")}</SelectItem>
                    {divisionOptions.map((d) => (
                        <SelectItem key={d.id} value={String(d.id)}>
                            {d.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {isAdmin && (
                <Select
                    value={filters.assigned_to_id ?? "all"}
                    onValueChange={(v) => set("assigned_to_id", v === "all" ? undefined : v)}
                >
                    <SelectTrigger className="h-8 w-40 text-xs">
                        <SelectValue placeholder={t("filters.allAssignees")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">{t("filters.allAssignees")}</SelectItem>
                        {users.map((u) => (
                            <SelectItem key={u.id} value={u.id}>
                                {u.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            {hasActiveFilters && (
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={clear}>
                    <XIcon className="size-3" />
                    {t("common:actions.clear")}
                </Button>
            )}
        </div>
    );
}
