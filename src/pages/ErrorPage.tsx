import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { type Variants, motion } from "motion/react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router";

const bubbles = [
    { cls: "h-3 w-3", pos: "top-[15%] left-[10%]", duration: 5, delay: 0 },
    { cls: "h-5 w-5", pos: "top-[25%] right-[12%]", duration: 7, delay: 1 },
    { cls: "h-2 w-2", pos: "top-[65%] left-[20%]", duration: 4.5, delay: 2.5 },
    { cls: "h-8 w-8", pos: "top-[55%] right-[18%]", duration: 9, delay: 0.5 },
    { cls: "h-4 w-4", pos: "top-[40%] left-[5%]", duration: 6, delay: 3 },
    { cls: "h-6 w-6", pos: "top-[20%] right-[33%]", duration: 8, delay: 1.8 },
    { cls: "h-2.5 w-2.5", pos: "bottom-[20%] left-[55%]", duration: 5.5, delay: 4 },
    { cls: "h-10 w-10", pos: "bottom-[30%] right-[8%]", duration: 11, delay: 0.3 },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ErrorPage() {
    const error = useRouteError();

    let statusCode = "500";
    let title = "Something went wrong";
    let description = "An unexpected error occurred. Please try again later.";

    if (isRouteErrorResponse(error)) {
        statusCode = String(error.status);
        title = error.statusText || title;
        description = typeof error.data === "string" ? error.data : description;
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground">
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
                    className={`pointer-events-none absolute ${b.cls} ${b.pos} rounded-full border border-destructive/20 bg-destructive/10`}
                    animate={{ y: [0, -22, 0], x: [0, 6, 0] }}
                    transition={{
                        duration: b.duration,
                        delay: b.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            <motion.div
                className="relative z-10 flex flex-col items-center gap-6 px-4 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.p
                    className="text-[9rem] leading-none font-black tracking-tighter text-destructive sm:text-[12rem]"
                    variants={itemVariants}
                >
                    {statusCode}
                </motion.p>

                <motion.div className="flex flex-col gap-2" variants={itemVariants}>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
                    <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
                </motion.div>

                <motion.div className="flex gap-3" variants={itemVariants}>
                    <Button asChild size="lg">
                        <Link to={ROUTES.HOME}>Go to Home</Link>
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
