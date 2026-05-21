const AUTH_ROOT_KEY = ["auth"] as const;

export const AUTH_QUERY_KEYS = {
    ROOT: AUTH_ROOT_KEY,
    ME: [...AUTH_ROOT_KEY, "me"],
} as const;
