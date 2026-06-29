import { queryOptions } from "@tanstack/react-query";
import { divisionService } from "../service/divisionService";
import type { DivisionListParams } from "../types";
import { DIVISION_QUERY_KEYS } from "./queryKeys";

export function listDivisionQueryOption(params: DivisionListParams = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: DIVISION_QUERY_KEYS.LIST(params),
        queryFn: ({ signal }) => divisionService.list(params, signal),
    });
}

export function getDivisionQueryOption(id: number) {
    return queryOptions({
        queryKey: DIVISION_QUERY_KEYS.GET(id),
        queryFn: ({ signal }) => divisionService.get(id, signal),
    });
}

export function listDivisionOptionsQueryOption() {
    return queryOptions({
        queryKey: DIVISION_QUERY_KEYS.OPTIONS,
        queryFn: ({ signal }) => divisionService.option(signal),
    });
}
