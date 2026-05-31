import type { CategoryListParams } from "../types";

const CATEGORY_ROOT_KEY = ["category"] as const;

export const CATEGORY_QUERY_KEYS = {
    ROOT: CATEGORY_ROOT_KEY,
    LIST: (params: CategoryListParams) => [...CATEGORY_ROOT_KEY, "list", params],
    OPTIONS: [...CATEGORY_ROOT_KEY, "options"],
    GET: (id: number) => [...CATEGORY_ROOT_KEY, `${id}`],
} as const;
