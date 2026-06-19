export interface AntrianListParams {
    page?: number;
    limit?: number;
    norm?: string;
}

export interface Antrian {
    kode_booking: number;
    no_antrian: string;
    norm: string;
    nama: string;
    no_kartu_bpjs: string;
    dokter: string;
    poli: string;
    status: number;
    waktu_check_in: string | null;
}
