import { queryOptions } from "@tanstack/react-query";
import { CATEGORY_QUERY_KEYS } from "./queryKeys";
import { categoryService } from "../service/categoryService";

export function listCategoryQueryOption() {
    return queryOptions({
        queryKey: CATEGORY_QUERY_KEYS.ROOT,
        queryFn: () => categoryService.list(),
    });
}
