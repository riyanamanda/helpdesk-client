import i18n from "@/i18n";
import { auth, googleProvider } from "@/lib/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { AUTH_QUERY_KEYS, PROFILE_QUERY_KEYS } from "../queries/queryKeys";
import { profileService } from "../service/profileService";
import type { UpdatePasswordRequest, UpdateProfileRequest } from "../types";

export function useUpdateProfileMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateProfileRequest) => profileService.updateProfile(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.ROOT });
            toast.success(i18n.t("common:toast.success"), {
                description: i18n.t("auth:profile.updatedSuccess"),
            });
        },
    });
}

export function useUpdateAvatarMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => profileService.updateAvatar(file),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.ROOT });
            await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.ME });
            toast.success(i18n.t("common:toast.success"), {
                description: i18n.t("auth:profile.avatarUpdatedSuccess"),
            });
        },
    });
}

export function useUpdatePasswordMutation() {
    return useMutation({
        mutationFn: (payload: UpdatePasswordRequest) => profileService.updatePassword(payload),
    });
}

export function useSyncGoogleMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const credential = await signInWithPopup(auth, googleProvider);
            const idToken = await credential.user.getIdToken();
            await profileService.syncGoogle({ id_token: idToken });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.ROOT });
            toast.success(i18n.t("common:toast.success"), {
                description: i18n.t("auth:google.linkedSuccess"),
            });
        },
    });
}

export function useRevokeGoogleMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => profileService.revokeGoogle(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.ROOT });
            toast.success(i18n.t("common:toast.success"), {
                description: i18n.t("auth:google.unlinkedSuccess"),
            });
        },
    });
}
