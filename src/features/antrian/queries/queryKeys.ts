import type { AntrianListParams } from "../types";

const ANTRIAN_ROOT_KEY = ["antrian"] as const;

export const ANTRIAN_QUERY_KEYS = {
    ROOT: ANTRIAN_ROOT_KEY,
    LIST: (params: AntrianListParams) => [...ANTRIAN_ROOT_KEY, "list", params],
} as const;
