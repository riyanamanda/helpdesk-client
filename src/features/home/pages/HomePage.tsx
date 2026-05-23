import { motion } from "motion/react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Team } from "../components/Team";

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

const heroVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

export function HomePage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
            <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.35) 1px, transparent 0)",
                    backgroundSize: "36px 36px",
                }}
            />

            <div className="pointer-events-none absolute inset-0 bg-radial from-transparent to-background" />

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

            <Header />

            <motion.section
                className="relative z-10 flex flex-1 flex-col items-center px-4 pt-8 text-center sm:px-6 sm:pt-12 lg:pt-16"
                variants={heroVariants}
                initial="hidden"
                animate="visible"
            >
                <Hero />
                <Team />
            </motion.section>

            <Footer />
        </div>
    );
}
