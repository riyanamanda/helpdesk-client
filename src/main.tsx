import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import "./index.css";
import { appRoutes } from "./router/index.tsx";

const router = createBrowserRouter(appRoutes);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <TooltipProvider>
                <RouterProvider router={router} />
            </TooltipProvider>
        </ThemeProvider>
    </StrictMode>
);
