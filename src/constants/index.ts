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
    INVALID_TOKEN: "INVALID_TOKEN",
    BAD_REQUEST: "BAD_REQUEST",
} as const;

export const ROUTES = {
    HOME: "/",

    LOGIN: "/login",

    DASHBOARD: "/dashboard",

    CATEGORY: {
        INDEX: "/category",
        CREATE: "/category/create",
        EDIT: "/category/:id/edit",
    },

    DIVISION: {
        INDEX: "/division",
        CREATE: "/division/create",
        EDIT: "/division/:id/edit",
    },

    USER: {
        INDEX: "/user",
        CREATE: "/user/create",
        EDIT: "/user/:id/edit",
    },

    RBAC: {
        INDEX: "/rbac",
    },

    TICKET: {
        INDEX: "/ticket",
        CREATE: "/ticket/create",
        EDIT: "/ticket/:id/edit",
        DETAIL: "/ticket/:id",
        DELETE: "/ticket/:id",
    },

    FEEDBACK: {
        INDEX: "/feedback",
        CREATE: "/feedback/create",
    },

    PROFILE: "/profile",
    PROFILE_UPDATE_PASSWORD: "/profile/update-password",
} as const;
