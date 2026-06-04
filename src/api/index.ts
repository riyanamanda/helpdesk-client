import { CONFIG, COOKIES, ERROR_CODES, ROUTES, SESSION_STORAGE_KEYS } from "@/constants";
import i18n from "@/i18n";
import { cookies } from "@/lib/cookies";
import Axios from "axios";
import { toast } from "sonner";

export const http = Axios.create({
    baseURL: CONFIG.API_BASE_URL,
    timeout: CONFIG.TIMEOUT,
    headers: {
        Accept: "Application/json",
    },
});

http.interceptors.request.use(
    (config) => {
        const token = cookies.get(COOKIES.TOKEN_KEY);

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

http.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status >= 500) {
            const requestId = error.response.headers?.["x-request-id"] as string | undefined;
            toast.error(i18n.t("toast.serverError"), {
                description: requestId
                    ? `${i18n.t("toast.serverErrorDescription")}\n${i18n.t("toast.requestId", { id: requestId })}`
                    : i18n.t("toast.serverErrorDescription"),
                ...(requestId && {
                    action: {
                        label: i18n.t("toast.copyId"),
                        onClick: () => navigator.clipboard.writeText(requestId),
                    },
                }),
            });
        }

        if (error.response && error.response.status === 401) {
            const error_code = error.response?.data?.error.code;

            if (
                error_code === ERROR_CODES.TOKEN_EXPIRED ||
                error_code === ERROR_CODES.INVALID_TOKEN
            ) {
                cookies.remove(COOKIES.TOKEN_KEY, { path: COOKIES.PATH });

                const currentPath = window.location.pathname + window.location.search;
                sessionStorage.setItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN, currentPath);

                window.location.href = window.location.origin + ROUTES.LOGIN;
            }
        }

        return Promise.reject(error);
    }
);
