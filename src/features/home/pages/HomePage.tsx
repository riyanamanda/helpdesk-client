import { RiyanImg } from "@/assets";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { COOKIES, ROUTES } from "@/constants";
import { cookies } from "@/lib/cookies";
import { getInitials } from "@/lib/formatters";
import { ArrowRightIcon, TicketIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const bubbles = [
    { cls: "h-3 w-3", pos: "top-[18%] left-[12%]", duration: 5, delay: 0 },
    { cls: "h-5 w-5", pos: "top-[28%] right-[14%]", duration: 7, delay: 1 },
    { cls: "h-2 w-2", pos: "top-[65%] left-[22%]", duration: 4.5, delay: 2.5 },
    { cls: "h-8 w-8", pos: "top-[55%] right-1/5", duration: 9, delay: 0.5 },
    { cls: "h-4 w-4", pos: "top-[38%] left-[6%]", duration: 6, delay: 3 },
    { cls: "h-6 w-6", pos: "top-[15%] right-[35%]", duration: 8, delay: 1.8 },
    { cls: "h-2.5 w-2.5", pos: "top-3/4 left-3/5", duration: 5.5, delay: 4 },
    { cls: "h-10 w-10", pos: "top-[42%] right-[7%]", duration: 11, delay: 0.3 },
];

const team = [
    {
        name: "Gunawan Santoso",
        role: "IT Support",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Rendra Triyono",
        role: "Network Engineer",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Adriansyah Malikus Saleh",
        role: "Network Engineer",
        image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1200&auto=format&fit=crop",
    },

    // CENTER
    {
        name: "Ledyana Puspasari",
        role: "IT Manager",
        featured: true,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    },
    // END

    {
        name: "Deti Nadya Rahma",
        role: "IT Helpdesk",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Riyan Amanda Nasution",
        role: "Fullstack Software Engineer",
        image: RiyanImg,
    },
    {
        name: "Rahmat Setiawan",
        role: "IT Support",
        image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Nabila",
        role: "IT Support",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1200&auto=format&fit=crop",
    },
];

// Hidden card placeholder (collapsed, non-interactive)
const hidden = { x: 0, scale: 0.5, rotate: 0, z: -1, opacity: 0 };

const stackConfigs = {
    // < 480px — 3 cards: indices 2, 3, 4
    xs: [
        hidden,
        hidden,
        { x: -95, scale: 0.88, rotate: -5, z: 2, opacity: 1 },
        { x: 0, scale: 1.0, rotate: 0, z: 30, opacity: 1 },
        { x: 95, scale: 0.88, rotate: 5, z: 3, opacity: 1 },
        hidden,
        hidden,
        hidden,
    ],
    // 480–767px — 5 cards: indices 1–5
    sm: [
        hidden,
        { x: -175, scale: 0.82, rotate: -8, z: 1, opacity: 1 },
        { x: -95, scale: 0.91, rotate: -4, z: 2, opacity: 1 },
        { x: 0, scale: 1.0, rotate: 0, z: 30, opacity: 1 },
        { x: 100, scale: 0.91, rotate: 4, z: 3, opacity: 1 },
        { x: 188, scale: 0.82, rotate: 8, z: 2, opacity: 1 },
        hidden,
        hidden,
    ],
    // 768–1023px — 7 cards: indices 0–6
    md: [
        { x: -285, scale: 0.8, rotate: -10, z: 1, opacity: 1 },
        { x: -192, scale: 0.87, rotate: -7, z: 2, opacity: 1 },
        { x: -98, scale: 0.93, rotate: -3, z: 3, opacity: 1 },
        { x: 0, scale: 1.0, rotate: 0, z: 30, opacity: 1 },
        { x: 100, scale: 0.93, rotate: 3, z: 4, opacity: 1 },
        { x: 192, scale: 0.87, rotate: 7, z: 3, opacity: 1 },
        { x: 280, scale: 0.82, rotate: 10, z: 2, opacity: 1 },
        hidden,
    ],
    // ≥ 1024px — all 8 cards
    lg: [
        { x: -360, scale: 0.8, rotate: -11, z: 1, opacity: 1 },
        { x: -240, scale: 0.87, rotate: -7, z: 2, opacity: 1 },
        { x: -120, scale: 0.93, rotate: -3, z: 3, opacity: 1 },
        { x: 0, scale: 1.0, rotate: 0, z: 30, opacity: 1 },
        { x: 120, scale: 0.93, rotate: 3, z: 4, opacity: 1 },
        { x: 240, scale: 0.87, rotate: 7, z: 3, opacity: 1 },
        { x: 355, scale: 0.82, rotate: 10, z: 2, opacity: 1 },
        { x: 465, scale: 0.77, rotate: 13, z: 1, opacity: 1 },
    ],
};

const heroVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

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

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handle = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handle);
        return () => window.removeEventListener("resize", handle);
    }, []);
    return width;
}

export function HomePage() {
    const isLoggedIn = !!cookies.get(COOKIES.TOKEN_KEY);
    const windowWidth = useWindowWidth();

    const activeConfig =
        windowWidth < 480
            ? stackConfigs.xs
            : windowWidth < 768
              ? stackConfigs.sm
              : windowWidth < 1024
                ? stackConfigs.md
                : stackConfigs.lg;

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
            {/* Background grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.35) 1px, transparent 0)",
                    backgroundSize: "36px 36px",
                }}
            />

            <div className="pointer-events-none absolute inset-0 bg-radial from-transparent to-background" />

            {/* Floating bubbles */}
            {bubbles.map((b, i) => (
                <motion.div
                    key={i}
                    className={`pointer-events-none absolute ${b.cls} ${b.pos} rounded-full border border-primary/20 bg-primary/10`}
                    animate={{ y: [0, -22, 0], x: [0, 6, 0] }}
                    transition={{
                        duration: b.duration,
                        delay: b.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Navbar */}
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
                            <Button size="sm">
                                {isLoggedIn ? "Dashboard" : "Sign In"}
                                <ArrowRightIcon className="ml-1 h-3.5 w-3.5" />
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <motion.section
                className="relative z-10 flex flex-1 flex-col items-center px-4 pt-8 text-center sm:px-6 sm:pt-12 lg:pt-16"
                variants={heroVariants}
                initial="hidden"
                animate="visible"
            >
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
                    The internal IT helpdesk for Erba employees. Submit tickets, track progress, and
                    get help — all in one place.
                </motion.p>

                <motion.div
                    variants={heroItem}
                    className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6"
                >
                    <NavLink to={ROUTES.DASHBOARD}>
                        <Button size="lg" className="h-10 px-5 text-sm sm:h-11 sm:px-7">
                            Go to Dashboard
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </NavLink>

                    {!isLoggedIn && (
                        <NavLink to={ROUTES.LOGIN}>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-10 px-5 text-sm sm:h-11 sm:px-7"
                            >
                                Sign In
                            </Button>
                        </NavLink>
                    )}
                </motion.div>

                {/* TEAM */}
                <div className="relative mt-8 h-72 w-full overflow-visible sm:mt-12 sm:h-88 lg:mt-16 lg:h-105">
                    <motion.p
                        className="text-center text-xs font-semibold tracking-[0.2em] text-primary uppercase"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Meet the IT Crew
                    </motion.p>

                    {/* glow */}
                    <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

                    <div className="relative flex h-full items-start justify-center pt-6 sm:pt-8">
                        {team.map((member, i) => {
                            const cfg = activeConfig[i];
                            const isFeatured = !!member.featured;
                            const isHidden = cfg.opacity === 0;

                            return (
                                <motion.div
                                    key={member.name}
                                    className="absolute"
                                    initial={{ opacity: 0, y: 60, scale: 0.7 }}
                                    animate={{
                                        opacity: cfg.opacity,
                                        y: 0,
                                        x: cfg.x,
                                        rotate: cfg.rotate,
                                        scale: cfg.scale,
                                    }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    whileHover={
                                        isHidden
                                            ? {}
                                            : {
                                                  y: -12,
                                                  scale: 1.1,
                                                  rotate: 0,
                                                  zIndex: 999,
                                                  opacity: 1,
                                              }
                                    }
                                    style={{
                                        zIndex: cfg.z,
                                        pointerEvents: isHidden ? "none" : "auto",
                                    }}
                                >
                                    <div
                                        className={`group relative w-40 overflow-hidden rounded-[1.5rem] border bg-black transition-all duration-100 sm:w-44 lg:w-52 ${
                                            isFeatured
                                                ? "border-primary/50 shadow-[0_0_40px_rgba(0,255,200,0.2)] ring-1 ring-primary/60 hover:shadow-[0_0_60px_rgba(0,255,200,0.3)]"
                                                : "border-white/20 hover:border-white/35"
                                        }`}
                                    >
                                        <div
                                            className={`pointer-events-none absolute inset-0 z-10 transition-all duration-300 ${
                                                cfg.z <= 1
                                                    ? "bg-black/40 group-hover:bg-black/10"
                                                    : cfg.z <= 2
                                                      ? "bg-black/25 group-hover:bg-black/10"
                                                      : "bg-black/10"
                                            }`}
                                        />

                                        {/* IMAGE */}
                                        <div className="relative h-64 overflow-hidden bg-muted sm:h-72 lg:h-90">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/20 via-muted to-background">
                                                    <span className="text-5xl font-bold text-primary/70">
                                                        {getInitials(member.name)}
                                                    </span>
                                                </div>
                                            )}

                                            {/* overlay */}
                                            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/10 via-40% to-transparent" />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="absolute inset-x-0 bottom-0 p-4 text-left lg:p-6">
                                            <p
                                                className={`leading-tight font-semibold text-white ${
                                                    isFeatured
                                                        ? "text-base lg:text-xl"
                                                        : "text-sm lg:text-base"
                                                }`}
                                            >
                                                {member.name}
                                            </p>

                                            <p className="mt-0.5 text-xs text-white/70 lg:mt-1 lg:text-sm">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* Footer */}
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
        </div>
    );
}
