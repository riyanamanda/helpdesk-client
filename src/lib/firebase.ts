import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, type Messaging } from "firebase/messaging";

const requiredEnvVars = [
    "VITE_FIREBASE_API_KEY",
    "VITE_FIREBASE_AUTH_DOMAIN",
    "VITE_FIREBASE_PROJECT_ID",
    "VITE_FIREBASE_STORAGE_BUCKET",
    "VITE_FIREBASE_MESSAGING_SENDER_ID",
    "VITE_FIREBASE_APP_ID",
] as const;

const missing = requiredEnvVars.filter((key) => !import.meta.env[key]);
if (missing.length > 0) {
    throw new Error(
        `Missing required environment variables: ${missing.join(", ")}. ` +
            "Please check your .env file."
    );
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// getMessaging throws in non-secure contexts (HTTP over IP address); messaging features are unavailable there
let _messaging: Messaging | null = null;
try {
    _messaging = getMessaging(app);
} catch {
    // silently unavailable
}
export const messaging = _messaging;
