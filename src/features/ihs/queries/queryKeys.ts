import type { PatientListParams } from "../types";

const PATIENT_ROOT_KEY = ["patient"] as const;

export const PATIENT_QUERY_KEYS = {
    ROOT: PATIENT_ROOT_KEY,
    LIST: (params: PatientListParams) => [...PATIENT_ROOT_KEY, "list", params],
    DETAIL: (norm: string) => [...PATIENT_ROOT_KEY, "detail", norm],
} as const;
