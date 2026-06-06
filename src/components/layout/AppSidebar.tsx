import { ROUTES } from "@/constants";
import { useIsAdmin } from "@/hooks/use-current-user";
import {
    BlocksIcon,
    GaugeIcon,
    MessageSquareTextIcon,
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
import { LogoImg } from "@/assets/images";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    const { t } = useTranslation("common");
    const isAdmin = useIsAdmin();

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <NavLink to={ROUTES.HOME}>
                                <img src={LogoImg} alt="IT Helpdesk" className="h-10" />
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
                <SidebarNav
                    items={[
                        { name: t("nav.dashboard"), url: ROUTES.DASHBOARD, icon: GaugeIcon },
                        { name: t("nav.tickets"), url: ROUTES.TICKET.INDEX, icon: TicketIcon },
                    ]}
                />
                {isAdmin && (
                    <>
                        <SidebarNav
                            label={t("nav.master")}
                            items={[
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
                            ]}
                        />
                        <SidebarNav
                            label={t("nav.auth")}
                            items={[
                                { name: t("nav.users"), url: ROUTES.USER.INDEX, icon: UserIcon },
                            ]}
                        />
                        <SidebarNav
                            label={"Customer Support"}
                            items={[
                                {
                                    name: t("nav.feedback"),
                                    url: ROUTES.FEEDBACK.INDEX,
                                    icon: MessageSquareTextIcon,
                                },
                            ]}
                        />
                    </>
                )}
                <SidebarNav
                    items={[
                        ...(!isAdmin
                            ? [
                                  {
                                      name: t("nav.feedback"),
                                      url: ROUTES.FEEDBACK.INDEX,
                                      icon: MessageSquareTextIcon,
                                  },
                              ]
                            : []),
                        {
                            is_blank: true,
                            name: t("nav.contact"),
                            url: "https://github.com/riyanamanda",
                            icon: SmartphoneNfcIcon,
                        },
                    ]}
                    className="mt-auto"
                />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
