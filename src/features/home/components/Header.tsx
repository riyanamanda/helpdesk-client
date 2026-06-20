import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { COOKIES, ROUTES } from "@/constants";
import { cookies } from "@/lib/cookies";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export function Header() {
    const { t } = useTranslation("home");
    const isLoggedIn = !!cookies.get(COOKIES.TOKEN_KEY);

    return (
        <header className="relative z-50 flex-none border-b border-border/40 bg-transparent backdrop-blur-3xl">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
                <div className="flex items-center gap-2.5">
                    <img
                        src="/favicon.svg"
                        alt="IT Helpdesk"
                        className="h-8"
                        width={32}
                        height={32}
                    />

                    <span className="text-sm font-semibold tracking-tight">
                        {t("header.appName")}
                    </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <LanguageSwitcher />
                    <ModeToggle />

                    <NavLink to={isLoggedIn ? ROUTES.DASHBOARD : ROUTES.LOGIN}>
                        <Button size="sm">
                            {isLoggedIn ? t("header.dashboard") : t("header.signIn")}
                        </Button>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
