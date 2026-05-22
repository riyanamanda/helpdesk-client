import { queryOptions } from "@tanstack/react-query";
import { divisionService } from "../service/divisionService";
import { DIVISION_QUERY_KEYS } from "./queryKeys";

export function listDivisionQueryOption() {
    return queryOptions({
        queryKey: DIVISION_QUERY_KEYS.ROOT,
        queryFn: () => divisionService.list(),
    });
}

export function getDivisionQueryOption(id: number) {
    return queryOptions({
        queryKey: DIVISION_QUERY_KEYS.GET(id),
        queryFn: () => divisionService.get(id),
    });
}
