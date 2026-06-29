import { queryOptions } from "@tanstack/react-query";
import { categoryService } from "../service/categoryService";
import type { CategoryListParams } from "../types";
import { CATEGORY_QUERY_KEYS } from "./queryKeys";

export function listCategoryQueryOption(params: CategoryListParams = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: CATEGORY_QUERY_KEYS.LIST(params),
        queryFn: ({ signal }) => categoryService.list(params, signal),
    });
}

export function getCategoryQueryOption(id: number) {
    return queryOptions({
        queryKey: CATEGORY_QUERY_KEYS.GET(id),
        queryFn: ({ signal }) => categoryService.get(id, signal),
    });
}

export function listCategoryOptionsQueryOption() {
    return queryOptions({
        queryKey: CATEGORY_QUERY_KEYS.OPTIONS,
        queryFn: ({ signal }) => categoryService.options(signal),
    });
}
