import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { listCategoryQueryOption } from "@/features/category/queries/category.query";
import { listDivisionQueryOption } from "@/features/division/queries/division.query";
import { listUserQueryOption } from "@/features/user/queries/user.query";
import { useQuery } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import type { TicketListParams, TicketPriority, TicketStatus } from "../types";

export type TicketFiltersState = Pick<
    TicketListParams,
    "status" | "priority" | "category_id" | "division_id" | "assigned_to_id"
>;

const STATUS_OPTIONS: { value: TicketStatus; label: string }[] = [
    { value: "OPEN", label: "Open" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "RESOLVED", label: "Resolved" },
    { value: "CLOSED", label: "Closed" },
];

const PRIORITY_OPTIONS: { value: TicketPriority; label: string }[] = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
    { value: "URGENT", label: "Urgent" },
];

interface TicketFiltersProps {
    filters: TicketFiltersState;
    onFiltersChange: (filters: TicketFiltersState) => void;
}

export function TicketFilters({ filters, onFiltersChange }: TicketFiltersProps) {
    const { data: categoriesData } = useQuery(listCategoryQueryOption({ page: 1, limit: 100 }));
    const { data: divisionsData } = useQuery(listDivisionQueryOption({ page: 1, limit: 100 }));
    const { data: usersData } = useQuery(listUserQueryOption({ page: 1, limit: 100 }));

    const categories = categoriesData?.data ?? [];
    const divisions = divisionsData?.data ?? [];
    const users = (usersData?.data ?? []).filter((u) => u.division.name === "IT");

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
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
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
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All priorities</SelectItem>
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
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((c) => (
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
                    <SelectValue placeholder="Room" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All rooms</SelectItem>
                    {divisions.map((d) => (
                        <SelectItem key={d.id} value={String(d.id)}>
                            {d.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.assigned_to_id ?? "all"}
                onValueChange={(v) => set("assigned_to_id", v === "all" ? undefined : v)}
            >
                <SelectTrigger className="h-8 w-40 text-xs">
                    <SelectValue placeholder="Assigned to" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All assignees</SelectItem>
                    {users.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                            {u.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {hasActiveFilters && (
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={clear}>
                    <XIcon className="size-3" />
                    Clear
                </Button>
            )}
        </div>
    );
}
