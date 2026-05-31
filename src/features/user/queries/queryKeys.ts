import type { UserListParams } from "../types";

const USER_ROOT_KEY = ["user"] as const;

export const USER_QUERY_KEYS = {
    ROOT: USER_ROOT_KEY,
    LIST: (params: UserListParams) => [...USER_ROOT_KEY, "list", params],
    GET: (id: string) => [...USER_ROOT_KEY, id],
    ASSIGNABLE_USER: [...USER_ROOT_KEY, "assignable"],
} as const;
