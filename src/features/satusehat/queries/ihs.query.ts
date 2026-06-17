import { queryOptions } from "@tanstack/react-query";
import { PATIENT_QUERY_KEYS } from "./queryKeys";
import type { PatientListParams } from "../types";
import { patientService } from "../service/patientService";

export function listPatientQueryOptions(params: PatientListParams = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: PATIENT_QUERY_KEYS.LIST(params),
        queryFn: () => patientService.list(params),
    });
}
