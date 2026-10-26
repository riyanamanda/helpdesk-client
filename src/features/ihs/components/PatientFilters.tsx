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

export function PatientFilters({ filters, onFiltersChange }: PatientFiltersProps) {
    const { t } = useTranslation("ihs");
    const currentMethod = filters.http_method ?? "GET";
    const hasActiveFilters = filters.http_method !== undefined && filters.http_method !== "GET";

    const set = <K extends keyof PatientFiltersState>(key: K, value: PatientFiltersState[K]) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const clear = () => onFiltersChange({ http_method: "GET" });

    return (
        <div className="flex flex-wrap items-center gap-2">
            <Select
                value={currentMethod}
                onValueChange={(v) => set("http_method", v as HttpMethod | "ALL")}
            >
                <SelectTrigger className="h-8 w-36 text-xs">
                    <SelectValue placeholder="Pilih Method" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">{t("filters.allMethods", "Semua Metode")}</SelectItem>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
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
