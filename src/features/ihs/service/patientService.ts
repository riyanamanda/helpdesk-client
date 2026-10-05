import { http } from "@/api";
import type { PaginatedResponse } from "@/types";
import type { Patient, PatientBpjs, PatientDetail, PatientListParams } from "../types";

export const patientService = {
    list: async (params?: PatientListParams, signal?: AbortSignal) => {
        const response = await http.get("/api/v1/patients", { params, signal });
        return response.data as PaginatedResponse<Patient>;
    },

    detail: async (norm: string, signal?: AbortSignal) => {
        const response = await http.get(`/api/v1/patients/${norm}/detail`, { signal });
        return response.data.data as PatientDetail;
    },

    create: async (norm: string) => {
        const response = await http.patch(`/api/v1/patients/${norm}`);
        return response.data;
    },

    getBpjsByNIK: async (nik: string, signal?: AbortSignal) => {
        const response = await http.get(`/api/v1/bpjs/peserta/${nik}`, { signal });
        return response.data.data as PatientBpjs;
    },
};
