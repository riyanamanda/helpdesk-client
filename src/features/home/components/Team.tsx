import { getInitials } from "@/lib/formatters";
import { m } from "motion/react";
import { useEffect, useState } from "react";
import { team } from "../data/team";
import { stackConfigs } from "../config/config";

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handle = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handle);
        return () => window.removeEventListener("resize", handle);
    }, []);
    return width;
}

export function Team() {
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
        <div className="relative mt-8 h-72 w-full overflow-visible sm:mt-12 sm:h-88 lg:mt-16 lg:h-105">
            <m.p
                className="text-center text-xs font-semibold tracking-[0.2em] text-accent-foreground uppercase"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                Meet the IT Crew
            </m.p>

            {/* glow */}
            <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-foreground/8 blur-3xl" />

            <div className="relative flex h-full items-start justify-center pt-6 sm:pt-8">
                {team.map((member, i) => {
                    const { opacity, x, rotate, scale, z } = activeConfig[i];
                    const isFeatured = !!member.featured;
                    const isHidden = opacity === 0;

                    return (
                        <m.div
                            key={member.name}
                            className="absolute"
                            initial={{ opacity: 0, y: 60, scale: 0.7 }}
                            animate={{ opacity, y: 0, x, rotate, scale }}
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
                                zIndex: z,
                                pointerEvents: isHidden ? "none" : "auto",
                            }}
                        >
                            <div
                                className={`group relative w-40 overflow-hidden rounded-[1.5rem] border transition-all duration-100 sm:w-44 lg:w-52`}
                            >
                                <div
                                    className={`pointer-events-none absolute inset-0 z-10 transition-all duration-300 ${
                                        z <= 1
                                            ? "bg-black/40 group-hover:bg-black/10"
                                            : z <= 2
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
                                            loading={isFeatured ? "eager" : "lazy"}
                                            decoding={isFeatured ? "sync" : "async"}
                                            fetchPriority={isFeatured ? "high" : "low"}
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
                        </m.div>
                    );
                })}
            </div>
        </div>
    );
}
