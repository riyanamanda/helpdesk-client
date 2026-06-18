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
import type { HttpMethod, PatientListParams } from "../types";

export type PatientFiltersState = Pick<PatientListParams, "http_method">;

interface PatientFiltersProps {
    filters: PatientFiltersState;
    onFiltersChange: (filters: PatientFiltersState) => void;
}

const HTTP_METHOD_OPTIONS: { value: HttpMethod; label: string }[] = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
];

export function PatientFilters({ filters, onFiltersChange }: PatientFiltersProps) {
    const { t } = useTranslation("satuSehat");

    const hasActiveFilters = Object.values(filters).some((v) => v !== undefined);

    const set = <K extends keyof PatientFiltersState>(key: K, value: PatientFiltersState[K]) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const clear = () => onFiltersChange({});

    return (
        <div className="flex flex-wrap items-center gap-2">
            <Select
                value={filters.http_method ?? "all"}
                onValueChange={(v) =>
                    set("http_method", v === "all" ? undefined : (v as HttpMethod))
                }
            >
                <SelectTrigger className="h-8 w-36 text-xs">
                    <SelectValue placeholder={t("filters.allMethods")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t("filters.allMethods")}</SelectItem>
                    {HTTP_METHOD_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                            {o.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {hasActiveFilters && (
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={clear}>
                    <XIcon className="size-3" />
                    {t("common:actions.clear")}
                </Button>
            )}
        </div>
    );
}
