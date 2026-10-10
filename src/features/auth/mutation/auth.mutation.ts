import { COOKIES, ROUTES, SESSION_STORAGE_KEYS } from "@/constants";
import { cookies, getJwtExpiry } from "@/lib/cookies";
import { auth, googleProvider } from "@/lib/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithCredential, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import { meQueryOption } from "../queries/auth.query";
import { authService } from "../service/authService";
import type { ForgotPasswordRequest, LoginRequest, ResetPasswordRequest } from "../types";

export function useLogoutMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return authService.logout();
        },
        onSettled: async () => {
            cookies.remove(COOKIES.TOKEN_KEY, { path: COOKIES.PATH });
            queryClient.clear();
            await navigate(ROUTES.LOGIN, { replace: true });
        },
    });
}

export function useGoogleOneTapMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (googleIdToken: string) => {
            const credential = GoogleAuthProvider.credential(googleIdToken);
            const userCredential = await signInWithCredential(auth, credential);
            const firebaseIdToken = await userCredential.user.getIdToken();
            const loginData = await authService.loginWithGoogle({ id_token: firebaseIdToken });
            cookies.set(COOKIES.TOKEN_KEY, loginData.data.access_token, {
                path: COOKIES.PATH,
                expires: getJwtExpiry(loginData.data.access_token),
            });
            return loginData;
        },
        onSuccess: async (loginData) => {
            queryClient.setQueryData(meQueryOption().queryKey, {
                data: loginData.data.user,
            });

            const redirectPath = sessionStorage.getItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN);
            if (redirectPath) {
                sessionStorage.removeItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN);
                await navigate(redirectPath, { replace: true });
            } else {
                await navigate(ROUTES.DASHBOARD);
            }
        },
    });
}

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
                expires: getJwtExpiry(loginData.data.access_token),
            });
            return loginData;
        },
        onSuccess: async (loginData) => {
            queryClient.setQueryData(meQueryOption().queryKey, {
                data: loginData.data.user,
            });

            const redirectPath = sessionStorage.getItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN);
            if (redirectPath) {
                sessionStorage.removeItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN);
                await navigate(redirectPath, { replace: true });
            } else {
                await navigate(ROUTES.DASHBOARD);
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
                expires: getJwtExpiry(loginData.data.access_token),
            });

            return loginData;
        },
        onSuccess: async (loginData) => {
            queryClient.setQueryData(meQueryOption().queryKey, {
                data: loginData.data.user,
            });

            const redirectPath = sessionStorage.getItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN);
            if (redirectPath) {
                sessionStorage.removeItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN);
                await navigate(redirectPath, { replace: true });
            } else {
                await navigate(ROUTES.DASHBOARD);
            }
        },
    });
}

export function useForgotPasswordMutation() {
    return useMutation({
        mutationFn: async (payload: ForgotPasswordRequest) =>
            await authService.forgotPassword(payload),
    });
}

export function useResetPasswordMutation() {
    return useMutation({
        mutationFn: async (payload: ResetPasswordRequest) =>
            await authService.resetPassword(payload),
    });
}
