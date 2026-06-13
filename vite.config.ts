import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
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
