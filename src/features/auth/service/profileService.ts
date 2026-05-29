import { http } from "@/api";
import type { User } from "@/features/user/types";
import type { UpdateProfileRequest } from "../types";

export const profileService = {
    getProfile: async (): Promise<{ data: User }> => {
        const response = await http.get("/api/v1/profile");
        return response.data;
    },

    updateProfile: async (payload: UpdateProfileRequest): Promise<void> => {
        await http.put("/api/v1/profile", payload);
    },

    updateAvatar: async (file: File): Promise<void> => {
        const form = new FormData();
        form.append("avatar", file);
        await http.patch("/api/v1/profile/avatar", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    syncGoogle: async (payload: { id_token: string }): Promise<void> => {
        await http.post("/api/v1/profile/sync-google", payload);
    },

    revokeGoogle: async () => {
        await http.post("/api/v1/profile/revoke-google");
    },
};
