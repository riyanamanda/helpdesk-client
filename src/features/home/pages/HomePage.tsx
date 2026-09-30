import { ROUTES } from "@/constants";
import {
    ArrowRight,
    BookOpen,
    CircleAlertIcon,
    Clock,
    ExternalLink,
    ShoppingCartIcon,
    TicketCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export function HomePage() {
    const { t } = useTranslation("home");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
            },
        },
    };

    const heroItem = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            },
        },
    };

    const actionCards = [
        {
            title: t("hero.cards.reportIssue.title"),
            description: t("hero.cards.reportIssue.desc"),
            icon: CircleAlertIcon,
            route: ROUTES.DASHBOARD,
            badge: t("hero.cards.reportIssue.badge"),
            badgeColor: "bg-destructive/10 text-destructive border-destructive/20",
        },
        {
            title: t("hero.cards.requestService.title"),
            description: t("hero.cards.requestService.desc"),
            icon: ShoppingCartIcon,
            route: ROUTES.DASHBOARD,
            badge: t("hero.cards.requestService.badge"),
            badgeColor: "bg-primary/10 text-primary border-primary/20",
        },
        {
            title: t("hero.cards.knowledgeBase.title"),
            description: t("hero.cards.knowledgeBase.desc"),
            icon: BookOpen,
            route: ROUTES.DASHBOARD,
            badge: t("hero.cards.knowledgeBase.badge"),
            badgeColor: "bg-chart-2/10 text-chart-2 border-chart-2/20",
        },
        {
            title: t("hero.cards.trackTicket.title"),
            description: t("hero.cards.trackTicket.desc"),
            icon: TicketCheck,
            route: ROUTES.DASHBOARD,
            badge: t("hero.cards.trackTicket.badge"),
            badgeColor: "bg-accent text-accent-foreground border-accent",
        },
    ];

    // Data sampel tiket aktif
    const activeTickets = [
        {
            id: "TK-1042",
            title: "Laptop performance is very slow after update",
            status: "In Progress",
            statusColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
            updated: "2h ago",
        },
        {
            id: "TK-1038",
            title: "Request for VPN Access to Staging Environment",
            status: "Pending Approval",
            statusColor: "bg-primary/10 text-primary border-primary/20",
            updated: "Yesterday",
        },
    ];

    // Data sampel artikel bantuan populer
    const popularArticles = [
        { title: "How to connect to Office Wi-Fi (WPA3 Enterprise)", category: "Network" },
        { title: "Step-by-step VPN Setup Guide for Windows & macOS", category: "Access" },
        { title: "Resetting your Outlook Email Password self-service", category: "Account" },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center pt-8 pb-5 text-center"
        >
            {/* Indikator Status Operasional Sistem */}
            <motion.div
                variants={heroItem}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary backdrop-blur-md"
            >
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {t("hero.systemsOperational")}
            </motion.div>

            {/* Judul Utama */}
            <motion.h1
                variants={heroItem}
                className="max-w-3xl text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
            >
                {t("hero.headline1")}{" "}
                <span className="bg-linear-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
                    {t("hero.headline2")}
                </span>
            </motion.h1>

            {/* Subjudul */}
            <motion.p
                variants={heroItem}
                className="mt-3 max-w-xl text-sm leading-relaxed text-balance text-muted-foreground sm:mt-4 sm:text-base"
            >
                {t("hero.subheadline")}
            </motion.p>

            {/* Grid Kartu Akses Layanan */}
            <motion.div
                variants={containerVariants}
                className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
                {actionCards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <NavLink key={idx} to={card.route} className="group block text-left">
                            <motion.div
                                variants={heroItem}
                                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                                className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-5 shadow-xs backdrop-blur-md transition-all hover:border-ring hover:bg-card/90 hover:shadow-md"
                            >
                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="rounded-lg bg-muted p-2.5 text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <Icon size={20} />
                                        </div>
                                        <span
                                            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${card.badgeColor}`}
                                        >
                                            {card.badge}
                                        </span>
                                    </div>
                                    <div className="text-base font-semibold text-card-foreground transition-colors group-hover:text-primary">
                                        {card.title}
                                    </div>
                                    <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                        {card.description}
                                    </div>
                                </div>
                            </motion.div>
                        </NavLink>
                    );
                })}
            </motion.div>

            {/* Section Widget: Tiket Aktif & Artikel Populer */}
            <motion.div
                variants={heroItem}
                className="mt-8 grid w-full max-w-5xl grid-cols-1 gap-6 text-left md:grid-cols-2"
            >
                {/* Widget 1: Tiket Aktif Saya */}
                <div className="rounded-xl border border-border bg-card/50 p-5 shadow-xs backdrop-blur-md">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TicketCheck size={18} className="text-muted-foreground" />
                            <h3 className="text-sm font-semibold text-card-foreground">
                                {t("hero.widgets.myActiveTickets")}
                            </h3>
                        </div>
                        <NavLink
                            to={ROUTES.DASHBOARD}
                            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {t("hero.widgets.viewAll")} <ArrowRight size={12} />
                        </NavLink>
                    </div>

                    <div className="space-y-3">
                        {activeTickets.map((ticket, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/60 p-3 text-xs transition-colors hover:border-ring"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                                            {ticket.id}
                                        </span>
                                        <span
                                            className={`py-0.2 rounded-full border px-2 text-[10px] font-medium ${ticket.statusColor}`}
                                        >
                                            {ticket.status}
                                        </span>
                                    </div>
                                    <p className="mt-1 truncate font-medium text-foreground">
                                        {ticket.title}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] whitespace-nowrap text-muted-foreground">
                                    <Clock size={12} />
                                    {ticket.updated}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Widget 2: Artikel Bantuan Populer */}
                <div className="rounded-xl border border-border bg-card/50 p-5 shadow-xs backdrop-blur-md">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BookOpen size={18} className="text-muted-foreground" />
                            <h3 className="text-sm font-semibold text-card-foreground">
                                {t("hero.widgets.topArticles")}
                            </h3>
                        </div>
                        <NavLink
                            to={ROUTES.DASHBOARD}
                            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {t("hero.widgets.browseKb")} <ArrowRight size={12} />
                        </NavLink>
                    </div>

                    <div className="space-y-2">
                        {popularArticles.map((article, idx) => (
                            <NavLink
                                key={idx}
                                to={ROUTES.DASHBOARD}
                                className="group flex items-center justify-between rounded-lg border border-transparent p-2.5 text-xs transition-colors hover:border-border hover:bg-muted/50"
                            >
                                <div className="flex items-center gap-2.5 truncate">
                                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                        {article.category}
                                    </span>
                                    <span className="truncate text-foreground/80 group-hover:text-foreground">
                                        {article.title}
                                    </span>
                                </div>
                                <ExternalLink
                                    size={12}
                                    className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                                />
                            </NavLink>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
