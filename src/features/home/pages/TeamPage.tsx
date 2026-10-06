import { m, type Variants } from "motion/react";
import { useTranslation } from "react-i18next";
import { TeamMemberCard } from "../components/TeamMemberCard";
import { team } from "../data/team";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

export function TeamPage() {
    const { t } = useTranslation("home");

    return (
        <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center pt-8 pb-5 text-center"
        >
            <m.p
                variants={itemVariants}
                className="text-xs font-semibold tracking-[0.2em] text-accent-foreground uppercase"
            >
                {t("team.eyebrow")}
            </m.p>

            <m.h1
                variants={itemVariants}
                className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl"
            >
                {t("team.title")}
            </m.h1>

            <m.p
                variants={itemVariants}
                className="mt-3 max-w-xl text-sm leading-relaxed text-balance text-muted-foreground sm:text-base"
            >
                {t("team.subtitle")}
            </m.p>

            <m.div
                variants={containerVariants}
                className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
            >
                {team.map((member) => (
                    <TeamMemberCard key={member.name} member={member} variants={itemVariants} />
                ))}
            </m.div>
        </m.div>
    );
}
