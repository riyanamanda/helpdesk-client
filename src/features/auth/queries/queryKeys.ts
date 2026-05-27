const AUTH_ROOT_KEY = ["auth"] as const;

export const AUTH_QUERY_KEYS = {
    ROOT: AUTH_ROOT_KEY,
    ME: [...AUTH_ROOT_KEY, "me"],
} as const;

const PROFILE_ROOT_KEY = ["profile"] as const;

export const PROFILE_QUERY_KEYS = {
    ROOT: PROFILE_ROOT_KEY,
    ME: [...PROFILE_ROOT_KEY, "me"] as const,
} as const;
