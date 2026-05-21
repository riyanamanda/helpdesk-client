import {
    CONFIG,
    COOKIES,
    ERROR_CODES,
    SESSION_STORAGE_KEYS,
} from "@/constants";
import { cookies } from "@/lib/cookies";
import Axios from "axios";

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
        if (error.response && error.response.status === 401) {
            const error_code = error.response?.data?.error.code;

            if (error_code === ERROR_CODES.TOKEN_EXPIRED) {
                cookies.remove(COOKIES.TOKEN_KEY, { path: COOKIES.PATH });

                const currentPath =
                    window.location.pathname + window.location.search;
                sessionStorage.setItem(
                    SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN,
                    currentPath
                );

                window.location.href = `${window.location.origin}/login`;
            }
        }

        return Promise.reject(error);
    }
);
