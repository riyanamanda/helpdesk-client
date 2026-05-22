import { queryOptions } from "@tanstack/react-query";
import { categoryService } from "../service/categoryService";
import { CATEGORY_QUERY_KEYS } from "./queryKeys";

export function listCategoryQueryOption() {
    return queryOptions({
        queryKey: CATEGORY_QUERY_KEYS.ROOT,
        queryFn: () => categoryService.list(),
    });
}

export function getCategoryQueryOption(id: number) {
    return queryOptions({
        queryKey: CATEGORY_QUERY_KEYS.GET(id),
        queryFn: () => categoryService.get(id),
    });
}
