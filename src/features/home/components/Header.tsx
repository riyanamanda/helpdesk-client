import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { COOKIES, ROUTES } from "@/constants";
import { cookies } from "@/lib/cookies";
import { TicketIcon } from "lucide-react";
import { NavLink } from "react-router";

export function Header() {
    const isLoggedIn = !!cookies.get(COOKIES.TOKEN_KEY);

    return (
        <header className="relative z-50 flex-none border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary sm:h-8 sm:w-8">
                        <TicketIcon className="h-3.5 w-3.5 text-primary-foreground sm:h-4 sm:w-4" />
                    </div>

                    <span className="text-sm font-semibold tracking-tight">IT Helpdesk</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <ModeToggle />

                    <NavLink to={isLoggedIn ? ROUTES.DASHBOARD : ROUTES.LOGIN}>
                        <Button size="sm">{isLoggedIn ? "Dashboard" : "Sign In"}</Button>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
