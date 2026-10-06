import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { COOKIES, ROUTES } from "@/constants";
import { cookies } from "@/lib/cookies";
import { cn } from "@/lib/utils";
import { GaugeIcon, LogInIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
        "text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground",
        isActive && "text-foreground"
    );

export function Header() {
    const { t } = useTranslation("home");
    const isLoggedIn = !!cookies.get(COOKIES.TOKEN_KEY);
    const accountLabel = isLoggedIn ? t("header.dashboard") : t("header.signIn");

    return (
        <header className="relative z-50 flex-none border-b border-border/40 bg-transparent backdrop-blur-3xl">
            <div className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-16 sm:px-6">
                <div className="flex min-w-0 items-center gap-2.5">
                    <img
                        src="/favicon.svg"
                        alt="IT Helpdesk"
                        className="h-8 shrink-0"
                        width={32}
                        height={32}
                    />

                    <span className="hidden text-sm font-semibold tracking-tight sm:inline">
                        {t("header.appName")}
                    </span>
                </div>

                <nav className="flex items-center justify-center gap-3 sm:gap-6">
                    <NavLink to={ROUTES.HOME} className={navLinkClass}>
                        {t("header.home")}
                    </NavLink>

                    <NavLink to={ROUTES.TEAM} className={navLinkClass}>
                        {t("header.team")}
                    </NavLink>
                </nav>

                <div className="flex items-center justify-end gap-1 sm:gap-3">
                    <LanguageSwitcher />
                    <ModeToggle />

                    <NavLink to={isLoggedIn ? ROUTES.DASHBOARD : ROUTES.LOGIN}>
                        <Button size="sm" className="px-2 sm:px-2.5" aria-label={accountLabel}>
                            {isLoggedIn ? (
                                <GaugeIcon className="size-4 sm:hidden" />
                            ) : (
                                <LogInIcon className="size-4 sm:hidden" />
                            )}
                            <span className="hidden sm:inline">{accountLabel}</span>
                        </Button>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
