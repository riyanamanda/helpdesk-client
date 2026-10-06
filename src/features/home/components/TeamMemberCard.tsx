import { getInitials } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { m, type Variants } from "motion/react";
import type { TeamMember } from "../data/team";

interface Props {
    member: TeamMember;
    variants: Variants;
}

export function TeamMemberCard({ member, variants }: Props) {
    return (
        <m.div
            variants={variants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={cn(
                "group overflow-hidden rounded-xl border border-border bg-card text-left shadow-xs backdrop-blur-md transition-all hover:border-ring hover:shadow-md",
                member.featured && "ring-2 ring-primary/40"
            )}
        >
            <div className="relative aspect-square overflow-hidden bg-muted">
                {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/20 via-muted to-background">
                        <span className="text-3xl font-bold text-primary/70">
                            {getInitials(member.name)}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-3">
                <p className="text-sm leading-snug font-semibold text-card-foreground">
                    {member.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{member.role}</p>
            </div>
        </m.div>
    );
}
