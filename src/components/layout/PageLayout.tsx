import type { PropsWithChildren } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export function PageLayout({ children }: PropsWithChildren) {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" size="icon-lg" />
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
