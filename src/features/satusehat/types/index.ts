export type PatientSortBy = "http_method" | "get_date";
export type HttpMethod = "GET" | "POST";
export type { SortType } from "@/types";
import type { SortType } from "@/types";

export interface PatientListParams {
    page?: number;
    limit?: number;
    search?: string;
    http_method?: HttpMethod;
    sort_by?: PatientSortBy;
    sort_type?: SortType;
}

export interface Patient {
    norm: string;
    name: string;
    nik: string;
    http_method: string;
    get_date: string;
}
