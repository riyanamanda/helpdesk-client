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
    identity_number: string;
    http_method: string;
    get_date: string;
}

export interface PatientDetail {
    norm: string;
    name: string;
    birth_place: string | null;
    birth_date: string;
    marital_status: string;
    citizenship: string;
    status: boolean;
    identity_card: IdentityCard;
}

export interface IdentityCard {
    identity_number: string;
    address: string;
    rt: string;
    rw: string;
    province?: string;
    city?: string;
    district?: string;
    sub_district?: string;
}
