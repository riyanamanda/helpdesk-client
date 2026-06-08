import { useEffect, useRef } from "react";
import { useGoogleOneTapMutation } from "../mutation/auth.mutation";

export function useGoogleOneTap() {
    const { mutate } = useGoogleOneTapMutation();
    const skipRef = useRef(false);

    useEffect(() => {
        if (skipRef.current) return;
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (!clientId) return;

        let script: HTMLScriptElement | null = null;

        const init = () => {
            if (skipRef.current) return;
            window.google?.accounts.id.initialize({
                client_id: clientId,
                callback: (response) => mutate(response.credential),
                auto_select: true,
                cancel_on_tap_outside: false,
            });
            window.google?.accounts.id.prompt();
        };

        if (window.google) {
            init();
        } else {
            script = document.querySelector<HTMLScriptElement>(
                'script[src="https://accounts.google.com/gsi/client"]'
            );
            script?.addEventListener("load", init, { once: true });
        }

        return () => {
            skipRef.current = true;
            script?.removeEventListener("load", init);
            window.google?.accounts.id.cancel();
        };
    }, [mutate]);
}
