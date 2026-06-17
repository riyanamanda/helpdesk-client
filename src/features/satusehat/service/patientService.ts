import { http } from "@/api";
import type { Patient, PatientListParams } from "../types";
import type { PaginatedResponse } from "@/types";

export const patientService = {
    list: async (params?: PatientListParams) => {
        const response = await http.get("/api/v1/patients", { params });
        return response.data as PaginatedResponse<Patient>;
    },
};
