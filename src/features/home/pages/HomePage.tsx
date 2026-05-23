import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { COOKIES, ROUTES } from "@/constants";
import { cookies } from "@/lib/cookies";
import { getInitials } from "@/lib/formatters";
import { ArrowRightIcon, TicketIcon } from "lucide-react";
import { motion } from "motion/react";
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
        role: "System Administrator",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Rendra Triyono",
        role: "Network Engineer",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Adriansyah Malikus Saleh",
        role: "Help Desk Analyst",
        image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Deti Nadya Rahma",
        role: "Help Desk Analyst",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    },

    // CENTER
    {
        name: "Ledyana Puspasari",
        role: "IT Manager",
        featured: true,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop",
    },

    {
        name: "Riyan Amanda Nasution",
        role: "IT Support",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
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

const stackConfig = [
    { x: -300, scale: 0.82, rotate: -10, z: 1, opacity: 0.7 },
    { x: -220, scale: 0.88, rotate: -7, z: 2, opacity: 0.8 },
    { x: -140, scale: 0.93, rotate: -4, z: 3, opacity: 0.9 },
    { x: -70, scale: 0.97, rotate: -2, z: 4, opacity: 0.96 },

    // center
    { x: 0, scale: 1.08, rotate: 0, z: 30, opacity: 1 },

    { x: 70, scale: 0.97, rotate: 2, z: 4, opacity: 0.96 },
    { x: 140, scale: 0.93, rotate: 4, z: 3, opacity: 0.9 },
    { x: 220, scale: 0.88, rotate: 7, z: 2, opacity: 0.8 },
];

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

export function HomePage() {
    const isLoggedIn = !!cookies.get(COOKIES.TOKEN_KEY);

    return (
        <div className="relative flex h-screen flex-col overflow-hidden bg-background text-foreground">
            {/* Background */}
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
                    animate={{
                        y: [0, -22, 0],
                        x: [0, 6, 0],
                    }}
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
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <TicketIcon className="h-4 w-4 text-primary-foreground" />
                        </div>

                        <span className="text-sm font-semibold tracking-tight">IT Helpdesk</span>
                    </div>

                    <div className="flex items-center gap-3">
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
                className="relative z-10 flex flex-1 flex-col items-center px-6 pt-14 text-center"
                variants={heroVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    variants={heroItem}
                    className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-medium backdrop-blur-sm"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />

                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    All systems operational
                </motion.div>

                <motion.h1
                    variants={heroItem}
                    className="max-w-4xl text-5xl font-extrabold tracking-tight text-balance lg:text-6xl xl:text-7xl"
                >
                    Support that{" "}
                    <span className="bg-linear-to-r from-primary via-primary/75 to-primary/40 bg-clip-text text-transparent">
                        never sleeps
                    </span>
                </motion.h1>

                <motion.p
                    variants={heroItem}
                    className="mt-4 max-w-xl text-base text-balance text-muted-foreground"
                >
                    The internal IT helpdesk for Erba employees. Submit tickets, track progress, and
                    get help — all in one place.
                </motion.p>

                <motion.div
                    variants={heroItem}
                    className="mt-6 flex flex-wrap items-center justify-center gap-3"
                >
                    <NavLink to={ROUTES.DASHBOARD}>
                        <Button size="lg" className="h-11 px-7 text-sm">
                            Go to Dashboard
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </NavLink>

                    {!isLoggedIn && (
                        <NavLink to={ROUTES.LOGIN}>
                            <Button size="lg" variant="outline" className="h-11 px-7 text-sm">
                                Sign In
                            </Button>
                        </NavLink>
                    )}
                </motion.div>

                {/* TEAM */}
                <div className="relative mt-16 h-105 w-full overflow-visible">
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

                    <div className="relative flex h-full items-start justify-center pt-8">
                        {team.map((member, i) => {
                            const cfg = stackConfig[i];
                            const isFeatured = !!member.featured;

                            return (
                                <motion.div
                                    key={member.name}
                                    className={`absolute overflow-hidden transition-all duration-300 ${
                                        cfg.z <= 3 ? "blur-[2px]" : "blur-0"
                                    }`}
                                    initial={{
                                        opacity: 0,
                                        y: 60,
                                        scale: 0.7,
                                    }}
                                    animate={{
                                        opacity: cfg.opacity,
                                        y: 0,
                                        x: cfg.x,
                                        rotate: cfg.rotate,
                                        scale: cfg.scale,
                                    }}
                                    transition={{
                                        duration: 0.18,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{
                                        y: -12,
                                        scale: 1.04,
                                        rotate: 0,
                                        zIndex: 999,
                                        filter: "blur(0px)",
                                    }}
                                    style={{
                                        zIndex: cfg.z,
                                    }}
                                >
                                    <div
                                        className={`group relative w-52 overflow-hidden rounded-[2rem] border border-white/10 bg-black/75 shadow-[0_30px_100px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_30px_120px_rgba(0,255,255,0.12)] ${isFeatured ? "ring-1 ring-primary/30" : ""} `}
                                    >
                                        <div
                                            className={`pointer-events-none absolute inset-0 z-10 transition-all duration-300 ${
                                                cfg.z <= 3
                                                    ? "bg-black/45 group-hover:bg-black/10"
                                                    : "bg-black/10"
                                            }`}
                                        />

                                        {/* IMAGE */}
                                        <div className="relative h-90 overflow-hidden bg-muted">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="h-full w-full object-cover brightness-[0.78] contrast-[1.08] saturate-[0.88] transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/20 via-muted to-background">
                                                    <span className="text-5xl font-bold text-primary/70">
                                                        {getInitials(member.name)}
                                                    </span>
                                                </div>
                                            )}

                                            {/* overlay */}
                                            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/55 via-40% to-transparent" />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                                            <p
                                                className={`leading-tight font-semibold text-white ${
                                                    isFeatured ? "text-xl" : "text-base"
                                                } `}
                                            >
                                                {member.name}
                                            </p>

                                            <p className="mt-1 text-sm text-white/70">
                                                {member.role}
                                            </p>

                                            {isFeatured && (
                                                <div className="mt-3 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md">
                                                    IT LEAD
                                                </div>
                                            )}
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
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-6 text-xs text-muted-foreground sm:flex-row">
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
