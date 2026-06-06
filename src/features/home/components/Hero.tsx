import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { m } from "motion/react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export function Hero() {
    const { t } = useTranslation("home");

    const heroItem = {
        hidden: {
            opacity: 0,
            y: 24,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            },
        },
    };

    return (
        <>
            <m.div
                variants={heroItem}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-medium backdrop-blur-sm sm:px-4"
            >
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {t("hero.systemsOperational")}
            </m.div>

            <m.h1
                variants={heroItem}
                className="max-w-4xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
                {t("hero.headline1")}{" "}
                <span className="bg-linear-to-r from-destructive via-accent-foreground to-primary bg-clip-text text-transparent">
                    {t("hero.headline2")}
                </span>
            </m.h1>

            <m.p
                variants={heroItem}
                className="mt-3 max-w-xl text-sm text-balance text-muted-foreground sm:mt-4 sm:text-base"
            >
                {t("hero.subheadline")}
            </m.p>

            <m.div
                variants={heroItem}
                className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6"
            >
                <NavLink to={ROUTES.DASHBOARD}>
                    <Button size="lg" className="h-10 px-5 text-sm sm:h-11 sm:px-7">
                        {t("hero.goToDashboard")}
                    </Button>
                </NavLink>
            </m.div>
        </>
    );
}
