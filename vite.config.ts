import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            injectRegister: "auto",
            // User provides their own site.webmanifest in public/
            manifest: false,
            workbox: {
                // Precache app shell — exclude Firebase SW to avoid it being versioned
                globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
                globIgnores: ["firebase-messaging-sw.js"],
                runtimeCaching: [
                    {
                        // API calls: network first, fall back to cache
                        urlPattern: /^https?:.*\/api\/v1\/.*/i,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "api-cache",
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60 * 24, // 24 hours
                            },
                            networkTimeoutSeconds: 10,
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        // Storage/media: stale-while-revalidate
                        urlPattern: /^https?:.*\/storage\/.*/i,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "media-cache",
                            expiration: {
                                maxEntries: 200,
                                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
        proxy: {
            "/storage": {
                target: "http://localhost:9000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/storage/, ""),
            },
        },
    },
    build: {
        target: "esnext",
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    router: ["react-router"],
                    query: ["@tanstack/react-query"],
                    table: ["@tanstack/react-table"],
                    motion: ["motion/react"],
                    form: ["react-hook-form"],
                    firebase: ["firebase/app", "firebase/auth"],
                    recharts: ["recharts"],
                },
            },
        },
    },
});
