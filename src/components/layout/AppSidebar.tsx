import { ROUTES } from "@/constants";
import { PERMISSIONS } from "@/constants/permissions";
import { useHasPermission, useIsAdmin } from "@/hooks/use-current-user";
import {
    BlocksIcon,
    ClipboardListIcon,
    GaugeIcon,
    HeartCrackIcon,
    MessageSquareTextIcon,
    PresentationIcon,
    SmartphoneNfcIcon,
    SquareUserIcon,
    TicketIcon,
    UserRoundKeyIcon,
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
    const canViewTicket = useHasPermission(PERMISSIONS.TICKET.VIEW);
    const canViewCategory = useHasPermission(PERMISSIONS.CATEGORY.VIEW);
    const canViewDivision = useHasPermission(PERMISSIONS.DIVISION.VIEW);
    const canViewUsers = useHasPermission(PERMISSIONS.USER.VIEW);
    const canViewAccess = useHasPermission(PERMISSIONS.RBAC.VIEW);
    const canViewFeedback = useHasPermission(PERMISSIONS.FEEDBACK.VIEW);
    const canViewIHS = useHasPermission(PERMISSIONS.IHS.VIEW);
    const canViewAntrian = useHasPermission(PERMISSIONS.ANTRIAN.VIEW);
    const isAdmin = useIsAdmin();

    const masterItems = [
        canViewCategory && {
            name: t("nav.category"),
            url: ROUTES.CATEGORY.INDEX,
            icon: BlocksIcon,
        },
        canViewDivision && {
            name: t("nav.division"),
            url: ROUTES.DIVISION.INDEX,
            icon: PresentationIcon,
        },
    ].filter(Boolean) as { name: string; url: string; icon: typeof BlocksIcon }[];

    const authItems = [
        canViewUsers && {
            name: t("nav.users"),
            url: ROUTES.USER.INDEX,
            icon: SquareUserIcon,
            iconClassName: "text-amber-500",
        },
        canViewAccess && {
            name: t("nav.access"),
            url: ROUTES.RBAC.INDEX,
            icon: UserRoundKeyIcon,
            iconClassName: "text-red-400",
        },
    ].filter(Boolean) as { name: string; url: string; icon: typeof SquareUserIcon }[];

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <NavLink to={ROUTES.HOME}>
                                <img
                                    src="/favicon.svg"
                                    alt="IT Helpdesk"
                                    className="h-10"
                                    width={40}
                                    height={40}
                                />
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
                        ...(canViewTicket
                            ? [
                                  {
                                      name: t("nav.tickets"),
                                      url: ROUTES.TICKET.INDEX,
                                      icon: TicketIcon,
                                  },
                              ]
                            : []),
                    ]}
                />
                {masterItems.length > 0 && (
                    <SidebarNav label={t("nav.master")} items={masterItems} />
                )}
                {authItems.length > 0 && <SidebarNav label={t("nav.auth")} items={authItems} />}
                {(canViewIHS || canViewAntrian) && (
                    <SidebarNav
                        label="SIMRS"
                        items={[
                            ...(canViewIHS
                                ? [
                                      {
                                          name: "Satu Sehat",
                                          url: ROUTES.IHS.INDEX,
                                          icon: HeartCrackIcon,
                                      },
                                  ]
                                : []),
                            ...(canViewAntrian
                                ? [
                                      {
                                          name: t("nav.antrian"),
                                          url: ROUTES.ANTRIAN.INDEX,
                                          icon: ClipboardListIcon,
                                      },
                                  ]
                                : []),
                        ]}
                    />
                )}
                {isAdmin && canViewFeedback && (
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
                )}
                <SidebarNav
                    items={[
                        ...(!isAdmin && canViewFeedback
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
                            url: "https://riyanamanda.vercel.app",
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
