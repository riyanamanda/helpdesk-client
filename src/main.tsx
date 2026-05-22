import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import "./index.css";
import { queryClient } from "./lib/query-client.ts";
import { appRoutes } from "./router/index.tsx";

const router = createBrowserRouter(appRoutes);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <TooltipProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <Toaster richColors position="top-right" closeButton />
                </QueryClientProvider>
            </TooltipProvider>
        </ThemeProvider>
    </StrictMode>
);
