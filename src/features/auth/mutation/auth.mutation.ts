import { COOKIES, ROUTES, SESSION_STORAGE_KEYS } from "@/constants";
import { auth, googleProvider } from "@/lib/firebase";
import { cookies } from "@/lib/cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import { meQueryOption } from "../queries/auth.query";
import { authService } from "../service/authService";
import type { LoginRequest } from "../types";

export function useGoogleLoginMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const credential = await signInWithPopup(auth, googleProvider);
            const idToken = await credential.user.getIdToken();
            const loginData = await authService.loginWithGoogle({ id_token: idToken });
            cookies.set(COOKIES.TOKEN_KEY, loginData.data.access_token, {
                path: COOKIES.PATH,
            });
            return loginData;
        },
        onSuccess: (loginData) => {
            queryClient.setQueryData(meQueryOption().queryKey, {
                data: loginData.data.user,
            });

            const redirectPath = sessionStorage.getItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN);
            if (redirectPath) {
                sessionStorage.removeItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN);
                navigate(redirectPath, { replace: true });
            } else {
                navigate(ROUTES.DASHBOARD);
            }
        },
    });
}

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
            queryClient.setQueryData(meQueryOption().queryKey, {
                data: loginData.data.user,
            });

            const redirectPath = sessionStorage.getItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN);
            if (redirectPath) {
                sessionStorage.removeItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN);
                navigate(redirectPath, { replace: true });
            } else {
                navigate(ROUTES.DASHBOARD);
            }
        },
    });
}
