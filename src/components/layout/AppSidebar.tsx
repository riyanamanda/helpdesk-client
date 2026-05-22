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

const data = {
    navMain: [
        {
            name: "Dashboard",
            url: ROUTES.DASHBOARD,
            icon: GaugeIcon,
        },
        {
            name: "Tickets",
            url: "#",
            icon: TicketIcon,
        },
    ],
    navMaster: [
        {
            name: "Category",
            url: ROUTES.CATEGORY.INDEX,
            icon: BlocksIcon,
        },
        {
            name: "Division",
            url: "#",
            icon: PresentationIcon,
        },
    ],
    navAuth: [
        {
            name: "Users",
            url: "#",
            icon: UserIcon,
        },
    ],
    navEtc: [
        {
            is_blank: true,
            name: "Contact",
            url: "https://github.com/riyanamanda",
            icon: SmartphoneNfcIcon,
        },
    ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
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
                                    <span className="truncate font-bold">IT Helpdesk</span>
                                    <span className="truncate text-xs">Erba ticketing system</span>
                                </div>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="gap-3">
                <SidebarNav items={data.navMain} />
                <SidebarNav label="Master" items={data.navMaster} />
                <SidebarNav label="Auth" items={data.navAuth} />
                <SidebarNav items={data.navEtc} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
