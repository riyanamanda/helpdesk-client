import { ROUTES } from "@/constants";
import {
    BlocksIcon,
    GaugeIcon,
    HeartHandshakeIcon,
    PresentationIcon,
    SmartphoneNfcIcon,
    TicketIcon,
    UserIcon,
} from "lucide-react";
import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { SidebarNav } from "../SidebarNav";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    const { t } = useTranslation("common");

    const data = {
        navMain: [
            {
                name: t("nav.dashboard"),
                url: ROUTES.DASHBOARD,
                icon: GaugeIcon,
            },
            {
                name: t("nav.tickets"),
                url: ROUTES.TICKET.INDEX,
                icon: TicketIcon,
            },
        ],
        navMaster: [
            {
                name: t("nav.category"),
                url: ROUTES.CATEGORY.INDEX,
                icon: BlocksIcon,
            },
            {
                name: t("nav.division"),
                url: ROUTES.DIVISION.INDEX,
                icon: PresentationIcon,
            },
        ],
        navAuth: [
            {
                name: t("nav.users"),
                url: ROUTES.USER.INDEX,
                icon: UserIcon,
            },
        ],
        navEtc: [
            {
                is_blank: true,
                name: t("nav.contact"),
                url: "https://github.com/riyanamanda",
                icon: SmartphoneNfcIcon,
            },
        ],
    };

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <NavLink to={ROUTES.HOME}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <HeartHandshakeIcon className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-bold">{t("appName")}</span>
                                    <span className="truncate text-xs">{t("appTagline")}</span>
                                </div>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="gap-3">
                <SidebarNav items={data.navMain} />
                <SidebarNav label={t("nav.master")} items={data.navMaster} />
                <SidebarNav label={t("nav.auth")} items={data.navAuth} />
                <SidebarNav items={data.navEtc} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
