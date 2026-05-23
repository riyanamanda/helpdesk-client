import { TicketIcon } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative z-10 flex-none border-t border-border/40 py-3">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-md bg-primary">
                        <TicketIcon className="h-2.5 w-2.5 text-primary-foreground" />
                    </div>

                    <span className="font-medium text-foreground">IT Helpdesk</span>

                    <span>· Erba Ticketing System</span>
                </div>

                <p>© {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
}
