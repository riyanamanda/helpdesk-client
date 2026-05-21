import { COOKIES, ROUTES, SESSION_STORAGE_KEYS } from "@/constants";
import { cookies } from "@/lib/cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { meQueryOption } from "../queries/auth.query";
import { authService } from "../service/authService";
import type { LoginRequest } from "../types";

export function useLoginMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: LoginRequest) => {
            const loginData = await authService.login(payload);
            cookies.set(COOKIES.TOKEN_KEY, loginData.data.access_token, {
                path: COOKIES.PATH,
            });

            return loginData;
        },
        onSuccess: (loginData) => {
            queryClient.setQueryData(
                meQueryOption().queryKey,
                loginData.data.user
            );

            const redirectPath = sessionStorage.getItem(
                SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN
            );
            if (redirectPath) {
                sessionStorage.removeItem(
                    SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN
                );
                navigate(redirectPath, { replace: true });
            } else {
                navigate(ROUTES.DASHBOARD);
            }
        },
    });
}
