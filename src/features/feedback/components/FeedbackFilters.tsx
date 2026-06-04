import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { FeedbackListParams, FeedbackStatus, FeedbackType } from "../types";

export type FeedbackFiltersState = Pick<FeedbackListParams, "type" | "status">;

interface FeedbackFiltersProps {
    filters: FeedbackFiltersState;
    onFiltersChange: (filters: FeedbackFiltersState) => void;
}

export function FeedbackFilters({ filters, onFiltersChange }: FeedbackFiltersProps) {
    const { t } = useTranslation("feedback");

    const TYPE_OPTIONS: { value: FeedbackType; label: string }[] = [
        { value: "FEATURE_REQUEST", label: t("type.FEATURE_REQUEST") },
        { value: "IMPROVEMENT", label: t("type.IMPROVEMENT") },
        { value: "BUG_REPORT", label: t("type.BUG_REPORT") },
    ];

    const STATUS_OPTIONS: { value: FeedbackStatus; label: string }[] = [
        { value: "OPEN", label: t("status.OPEN") },
        { value: "IN_REVIEW", label: t("status.IN_REVIEW") },
        { value: "ACCEPTED", label: t("status.ACCEPTED") },
        { value: "REJECTED", label: t("status.REJECTED") },
        { value: "DELIVERED", label: t("status.DELIVERED") },
    ];

    const hasActiveFilters = Object.values(filters).some((v) => v !== undefined);

    const set = <K extends keyof FeedbackFiltersState>(key: K, value: FeedbackFiltersState[K]) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            <Select
                value={filters.type ?? "all"}
                onValueChange={(v) => set("type", v === "all" ? undefined : (v as FeedbackType))}
            >
                <SelectTrigger className="h-8 w-40 text-xs">
                    <SelectValue placeholder={t("filters.allTypes")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t("filters.allTypes")}</SelectItem>
                    {TYPE_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                            {o.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.status ?? "all"}
                onValueChange={(v) =>
                    set("status", v === "all" ? undefined : (v as FeedbackStatus))
                }
            >
                <SelectTrigger className="h-8 w-36 text-xs">
                    <SelectValue placeholder={t("filters.allStatuses")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t("filters.allStatuses")}</SelectItem>
                    {STATUS_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                            {o.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => onFiltersChange({})}
                >
                    <XIcon className="size-3" />
                    {t("common:actions.clear")}
                </Button>
            )}
        </div>
    );
}
