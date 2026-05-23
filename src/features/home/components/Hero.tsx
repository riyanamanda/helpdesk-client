import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { NavLink } from "react-router";
import { motion } from "motion/react";

export function Hero() {
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
            <motion.div
                variants={heroItem}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-medium backdrop-blur-sm sm:px-4"
            >
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                All systems operational
            </motion.div>

            <motion.h1
                variants={heroItem}
                className="max-w-4xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
                Support that{" "}
                <span className="bg-linear-to-r from-primary via-primary/75 to-primary/40 bg-clip-text text-transparent">
                    never sleeps
                </span>
            </motion.h1>

            <motion.p
                variants={heroItem}
                className="mt-3 max-w-xl text-sm text-balance text-muted-foreground sm:mt-4 sm:text-base"
            >
                The internal IT helpdesk for Erba employees. Submit tickets, track progress, and get
                help — all in one place.
            </motion.p>

            <motion.div
                variants={heroItem}
                className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6"
            >
                <NavLink to={ROUTES.DASHBOARD}>
                    <Button size="lg" className="h-10 px-5 text-sm sm:h-11 sm:px-7">
                        Go to Dashboard
                    </Button>
                </NavLink>
            </motion.div>
        </>
    );
}
