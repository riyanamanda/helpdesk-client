import { PageBackground } from "@/components/PageBackground";
import { domAnimation, LazyMotion } from "motion/react";
import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function LandingLayout() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
            <PageBackground />

            <div className="pointer-events-none absolute top-1/4 left-1/6 h-112 w-md -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 right-1/6 h-96 w-96 rounded-full bg-accent-foreground/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-1/4 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

            <LazyMotion features={domAnimation}>
                <Header />

                <main className="relative z-10 flex flex-1 flex-col">
                    <Outlet />
                </main>
            </LazyMotion>

            <Footer />
        </div>
    );
}
