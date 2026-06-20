import { m } from "motion/react";
import { Hero } from "../components/Hero";
import { Team } from "../components/Team";

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
        <m.section
            className="flex flex-1 flex-col items-center px-4 pt-8 text-center sm:px-6 lg:pt-8"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
        >
            <Hero />
            <Team />
        </m.section>
    );
}
