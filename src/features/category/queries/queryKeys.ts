const CATEGORY_ROOT_KEY = ["category"] as const;

export const CATEGORY_QUERY_KEYS = {
    ROOT: CATEGORY_ROOT_KEY,
    GET: (id: number) => [...CATEGORY_ROOT_KEY, `${id}`],
} as const;
