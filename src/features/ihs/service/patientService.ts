import { http } from "@/api";
import type { PaginatedResponse } from "@/types";
import type { Patient, PatientDetail, PatientListParams } from "../types";

export const patientService = {
    list: async (params?: PatientListParams) => {
        const response = await http.get("/api/v1/patients", { params });
        return response.data as PaginatedResponse<Patient>;
    },

    detail: async (norm: string) => {
        const response = await http.get(`/api/v1/patients/${norm}/detail`);
        return response.data.data as PatientDetail;
    },

    // it PATCH because this method is used for update value from GET to POST (httpRequest column)
    // that means from simgos perspective is creating ihs patient to ihs master index
    create: async (norm: string) => {
        const response = await http.patch(`/api/v1/patients/${norm}`);
        return response.data;
    },
};
