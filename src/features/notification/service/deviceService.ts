import { http } from "@/api";

export const deviceService = {
    register: async (fcmToken: string) => {
        await http.post("/api/v1/devices", { fcm_token: fcmToken });
    },

    unregister: async (fcmToken: string) => {
        await http.delete("/api/v1/devices", { data: { fcm_token: fcmToken } });
    },
};
