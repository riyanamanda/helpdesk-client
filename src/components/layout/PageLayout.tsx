/* eslint-disable react-refresh/only-export-components */
import type { PropsWithChildren, ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { SiteHeader } from "./SiteHeader";

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
    return <div className="space-y-4">{children}</div>;
}

export const PageLayout = Object.assign(
    function PageLayout({ children }: PropsWithChildren) {
        return (
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <main className="flex flex-1 flex-col gap-4 px-4 py-1">{children}</main>
                </SidebarInset>
            </SidebarProvider>
        );
    },
    {
        Header: PageLayoutHeader,
        Content: PageLayoutContent,
    }
);
