import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { COOKIES, ROUTES } from "@/constants";
import { cookies } from "@/lib/cookies";
import { ArrowRightIcon, TicketIcon } from "lucide-react";
import { NavLink } from "react-router";

const bubbles = [
    { cls: "h-3 w-3", pos: "top-[18%] left-[12%]", duration: "5s", delay: "0s" },
    { cls: "h-5 w-5", pos: "top-[28%] right-[14%]", duration: "7s", delay: "1s" },
    { cls: "h-2 w-2", pos: "top-[65%] left-[22%]", duration: "4.5s", delay: "2.5s" },
    { cls: "h-8 w-8", pos: "top-[55%] right-[20%]", duration: "9s", delay: "0.5s" },
    { cls: "h-4 w-4", pos: "top-[38%] left-[6%]", duration: "6s", delay: "3s" },
    { cls: "h-6 w-6", pos: "top-[15%] right-[35%]", duration: "8s", delay: "1.8s" },
    { cls: "h-2.5 w-2.5", pos: "top-[75%] left-[60%]", duration: "5.5s", delay: "4s" },
    { cls: "h-10 w-10", pos: "top-[42%] right-[7%]", duration: "11s", delay: "0.3s" },
    { cls: "h-3 w-3", pos: "top-[82%] left-[38%]", duration: "6.5s", delay: "2s" },
    { cls: "h-5 w-5", pos: "top-[22%] left-[55%]", duration: "7.5s", delay: "3.5s" },
];

export function HomePage() {
    const isLoggedIn = !!cookies.get(COOKIES.TOKEN_KEY);

    return (
        <div className="relative min-h-screen bg-background text-foreground">
            {/* Navbar */}
            <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
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

            {/* Hero */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-175 w-175 rounded-full bg-primary/6 blur-3xl" />
                </div>

                {/* Dot grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
                        backgroundSize: "36px 36px",
                    }}
                />

                {/* Fade edges over grid */}
                <div className="pointer-events-none absolute inset-0 bg-radial from-transparent to-background" />

                {/* Floating bubbles */}
                {bubbles.map((b, i) => (
                    <div
                        key={i}
                        className={`pointer-events-none absolute ${b.cls} ${b.pos} rounded-full border border-primary/20 bg-primary/5`}
                        style={{ animation: `float ${b.duration} ease-in-out ${b.delay} infinite` }}
                    />
                ))}

                <div className="relative z-10 flex flex-col items-center">
                    {/* Status pill */}
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>
                        All systems operational
                    </div>

                    {/* Headline */}
                    <h1 className="max-w-4xl text-6xl font-extrabold tracking-tight text-balance lg:text-7xl xl:text-8xl">
                        Support that{" "}
                        <span className="bg-linear-to-r from-primary via-primary/75 to-primary/40 bg-clip-text text-transparent">
                            never sleeps
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg text-balance text-muted-foreground">
                        The internal IT helpdesk for Erba employees. Submit tickets, track progress,
                        and get help — all in one place.
                    </p>

                    {/* CTAs */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                        <NavLink to={ROUTES.DASHBOARD}>
                            <Button size="lg" className="h-12 px-8 text-base">
                                Go to Dashboard
                                <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </NavLink>
                        {!isLoggedIn && (
                            <NavLink to={ROUTES.LOGIN}>
                                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                                    Sign In
                                </Button>
                            </NavLink>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="fixed bottom-0 w-full border-t border-border/40 bg-background/80 py-4 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 text-sm text-muted-foreground sm:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary">
                            <TicketIcon className="h-3 w-3 text-primary-foreground" />
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
