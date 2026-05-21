export const CONFIG = {
    APP_NAME: import.meta.env.VITE_APP_NAME,
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    TIMEOUT: 30000,
} as const;

export const COOKIES = {
    TOKEN_KEY: "it_helpdesk_erba",
    PATH: "/",
} as const;

export const SESSION_STORAGE_KEYS = {
    REDIRECT_AFTER_LOGIN: "redirect_after_login",
} as const;

export const ERROR_CODES = {
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    BAD_REQUEST: "BAD_REQUEST",
} as const;

export const ROUTES = {
    HOME: "/",

    LOGIN: "/login",

    DASHBOARD: "/dashboard",
} as const;
