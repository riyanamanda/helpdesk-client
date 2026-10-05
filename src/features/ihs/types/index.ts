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
    identity_number: string | null;
    http_method: string;
    get_date: string;
    last_registration: string | null;
    poly: string | null;
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
    identity_number: string | null;
    address: string | null;
    rt: string | null;
    rw: string | null;
    province: string | null;
    city: string | null;
    district: string | null;
    sub_district: string | null;
}

export interface CodeDesc {
    kode: string;
    keterangan: string;
}

export interface MedicalRecord {
    no_mr: string | null;
    no_telepon: string | null;
}

export interface Provider {
    kd_provider: string;
    nm_provider: string;
}

export interface Umur {
    umur_sekarang: string;
    umur_saat_pelayanan: string;
}

export interface Informasi {
    dinsos: string | null;
    prolanis_prb: string | null;
    no_sktm: string | null;
    e_sep: string | null;
}

export interface Cob {
    no_asuransi: string | null;
    nm_asuransi: string | null;
    tgl_tmt: string | null;
    tgl_tat: string | null;
}

export interface PatientBpjs {
    no_kartu: string;
    nik: string;
    nama: string;
    pisa: string;
    sex: string;
    tgl_lahir: string;
    tgl_cetak_kartu: string;
    tgl_tat: string;
    tgl_tmt: string;
    mr: MedicalRecord;
    status_peserta: CodeDesc;
    prov_umum: Provider;
    jenis_peserta: CodeDesc;
    hak_kelas: CodeDesc;
    umur: Umur;
    informasi: Informasi;
    cob: Cob;
}
