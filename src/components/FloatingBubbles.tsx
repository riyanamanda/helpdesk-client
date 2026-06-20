import { m } from "motion/react";

interface Bubble {
    cls: string;
    pos: string;
    duration: number;
    delay: number;
    color?: string;
}

export function FloatingBubbles({ bubbles, color }: { bubbles: Bubble[]; color?: string }) {
    return (
        <>
            {bubbles.map((b, i) => (
                <m.div
                    key={i}
                    className={`pointer-events-none absolute ${b.cls} ${b.pos} rounded-full border ${b.color ?? color}`}
                    animate={{ y: [0, -22, 0], x: [0, 6, 0] }}
                    transition={{
                        duration: b.duration,
                        delay: b.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </>
    );
}
