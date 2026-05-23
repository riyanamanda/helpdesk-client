import type { DivisionListParams } from "../types";

const DIVISION_ROOT_KEY = ["division"] as const;

export const DIVISION_QUERY_KEYS = {
    ROOT: DIVISION_ROOT_KEY,
    LIST: (params: DivisionListParams) => [...DIVISION_ROOT_KEY, "list", params],
    GET: (id: number) => [...DIVISION_ROOT_KEY, `${id}`],
} as const;
