import { auth, googleProvider } from "@/lib/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { AUTH_QUERY_KEYS, PROFILE_QUERY_KEYS } from "../queries/queryKeys";
import { profileService } from "../service/profileService";
import type { UpdateProfileRequest } from "../types";

export function useUpdateProfileMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateProfileRequest) => profileService.updateProfile(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.ROOT });
            toast.success("Profile updated successfully");
        },
    });
}

export function useUpdateAvatarMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => profileService.updateAvatar(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.ROOT });
            queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.ME });
            toast.success("Avatar updated successfully");
        },
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.ROOT });
            toast.success("Google account linked successfully");
        },
    });
}

export function useRevokeGoogleMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => profileService.revokeGoogle(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.ROOT });
            toast.success("Google account unlinked successfully");
        },
    });
}
