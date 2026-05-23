import { queryOptions } from "@tanstack/react-query";
import { categoryService } from "../service/categoryService";
import type { CategoryListParams } from "../types";
import { CATEGORY_QUERY_KEYS } from "./queryKeys";

export function listCategoryQueryOption(params: CategoryListParams = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: CATEGORY_QUERY_KEYS.LIST(params),
        queryFn: () => categoryService.list(params),
    });
}

export function getCategoryQueryOption(id: number) {
    return queryOptions({
        queryKey: CATEGORY_QUERY_KEYS.GET(id),
        queryFn: () => categoryService.get(id),
    });
}
