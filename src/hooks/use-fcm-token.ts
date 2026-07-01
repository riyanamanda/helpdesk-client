import { useEffect, useRef } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { messaging } from "@/lib/firebase";
import { deviceService } from "@/features/notification/service/deviceService";
import { NOTIFICATION_QUERY_KEYS } from "@/features/notification/queries";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY as string;

let activeFCMToken: string | null = null;

export function getActiveFCMToken() {
    return activeFCMToken;
}

const SW_PARAMS = new URLSearchParams({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

async function persistLangToCache(lang: string) {
    if (!("caches" in window)) return;
    const cache = await caches.open("app-prefs");
    await cache.put("/lang", new Response(lang));
}

export function useFCMToken() {
    const queryClient = useQueryClient();
    const { i18n } = useTranslation("notification");
    const navigate = useNavigate();
    const tokenRef = useRef<string | null>(null);

    useEffect(() => {
        persistLangToCache(i18n.language);
        i18n.on("languageChanged", persistLangToCache);
        return () => {
            i18n.off("languageChanged", persistLangToCache);
        };
    }, [i18n]);

    useEffect(() => {
        if (!messaging || !("Notification" in window) || !("serviceWorker" in navigator)) return;

        const msg = messaging;
        let unsubscribeMessage: (() => void) | undefined;

        async function init() {
            const permission = await Notification.requestPermission();
            if (permission !== "granted") return;

            const registration = await navigator.serviceWorker.register(
                `/firebase-messaging-sw.js?${SW_PARAMS.toString()}`
            );

            const token = await getToken(msg, {
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration,
            });

            if (!token || token === tokenRef.current) return;
            tokenRef.current = token;
            activeFCMToken = token;

            await deviceService.register(token);

            unsubscribeMessage = onMessage(msg, (payload) => {
                const data = payload.data as Record<string, string> | undefined;
                if (!data) return;

                const type = data.type ?? "";
                const actorName = data.actor_name ?? "";
                const status = data.status ?? "";
                const referenceType = data.reference_type ?? "";
                const referenceId = data.reference_id ?? "";

                const baseKey = `types.${type}`;
                const bodyKey = status ? `${baseKey}.${status}` : baseKey;
                const body = i18n.t(bodyKey, { ns: "notification", actor_name: actorName });
                const title = i18n.t(`titles.${type}`, { ns: "notification", defaultValue: type });

                const path =
                    referenceType === "TICKET"
                        ? `/ticket/${referenceId}`
                        : `/feedback/${referenceId}`;

                toast(title, {
                    description: body,
                    action: referenceId
                        ? {
                              label: i18n.t("view", { ns: "notification" }),
                              onClick: () => navigate(path),
                          }
                        : undefined,
                });

                queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.ROOT });
            });
        }

        init().catch(console.error);

        return () => {
            unsubscribeMessage?.();
        };
    }, [queryClient, i18n, navigate]);
}
