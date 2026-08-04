/* eslint-disable react-refresh/only-export-components */
import type { PropsWithChildren, ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { SiteHeader } from "./SiteHeader";
import { useFCMToken } from "@/hooks/use-fcm-token";

interface PageLayoutHeaderProps {
    title: string;
    description?: string;
    actions?: ReactNode;
}

function PageLayoutHeader({ title, description, actions }: PageLayoutHeaderProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
                {description ? (
                    <p className="text-sm text-muted-foreground">{description}</p>
                ) : null}
            </div>
            {actions != null ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
    );
}

function PageLayoutContent({ children }: PropsWithChildren) {
    return <div className="min-w-0 space-y-4">{children}</div>;
}

export const PageLayout = Object.assign(
    function PageLayout({ children }: PropsWithChildren) {
        useFCMToken();

        return (
            <SidebarProvider>
                <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-float-glow rounded-full bg-destructive/10 blur-3xl" />
                    <div className="absolute top-1/2 right-1/4 h-80 w-80 animate-float-glow rounded-full bg-accent-foreground/10 blur-3xl [animation-delay:2s]" />
                    <div className="absolute bottom-1/4 left-1/2 h-72 w-72 -translate-x-1/2 animate-float-glow rounded-full bg-primary/10 blur-3xl [animation-delay:4s]" />
                </div>
                <AppSidebar variant="sidebar" />
                <SidebarInset>
                    <SiteHeader />
                    <main className="flex min-w-0 flex-1 flex-col gap-4 px-4 pt-2 pb-10">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        );
    },
    {
        Header: PageLayoutHeader,
        Content: PageLayoutContent,
    }
);
