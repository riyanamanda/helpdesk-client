import { queryOptions } from "@tanstack/react-query";
import { patientService } from "../service/patientService";
import type { PatientListParams } from "../types";
import { PATIENT_QUERY_KEYS } from "./queryKeys";

export function listPatientQueryOptions(params: PatientListParams = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: PATIENT_QUERY_KEYS.LIST(params),
        queryFn: ({ signal }) => patientService.list(params, signal),
    });
}

export function detailPatientQueryOptions(norm: string) {
    return queryOptions({
        queryKey: PATIENT_QUERY_KEYS.DETAIL(norm),
        queryFn: ({ signal }) => patientService.detail(norm, signal),
    });
}

export function detailBPJSPatientQueryOptions(nik: string) {
    return queryOptions({
        queryKey: PATIENT_QUERY_KEYS.BPJS_PATIENT(nik),
        queryFn: ({ signal }) => patientService.getBpjsByNIK(nik, signal),
    });
}
