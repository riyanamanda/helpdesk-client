import { queryOptions } from "@tanstack/react-query";
import { antrianService } from "../service/antrianService";
import type { AntrianListParams } from "../types";
import { ANTRIAN_QUERY_KEYS } from "./queryKeys";

export function listAntrianQueryOptions(params: AntrianListParams = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: ANTRIAN_QUERY_KEYS.LIST(params),
        queryFn: () => antrianService.list(params),
    });
}
