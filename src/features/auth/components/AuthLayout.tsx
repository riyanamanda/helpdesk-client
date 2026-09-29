import { ErbaImg } from "@/assets/images";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import { CONFIG, ROUTES } from "@/constants";
import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";

export function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <NavLink to={ROUTES.HOME} className="flex items-center gap-2 font-medium">
                        <img
                            src="/favicon.svg"
                            className="flex size-6 items-center justify-center rounded-md"
                        />
                        {CONFIG.APP_NAME}
                    </NavLink>

                    <div className="ml-auto space-x-2">
                        <LanguageSwitcher />
                        <ModeToggle />
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">{children}</div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src={ErbaImg}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
