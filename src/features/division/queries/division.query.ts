import { queryOptions } from "@tanstack/react-query";
import { divisionService } from "../service/divisionService";
import { DIVISION_QUERY_KEYS } from "./queryKeys";

export function listDivisionQueryOption(params = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: DIVISION_QUERY_KEYS.LIST(params),
        queryFn: () => divisionService.list(params),
    });
}

export function getDivisionQueryOption(id: number) {
    return queryOptions({
        queryKey: DIVISION_QUERY_KEYS.GET(id),
        queryFn: () => divisionService.get(id),
    });
}
