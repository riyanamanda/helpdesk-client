import type { LucideIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";

export function SidebarNav({
    label,
    items,
    ...props
}: {
    label?: string;
    items: {
        is_blank?: boolean;
        name: string;
        url: string;
        icon: LucideIcon;
        iconClassName?: string;
    }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const { pathname } = useLocation();

    function isActive(url: string) {
        if (url === "/" || url === "#") return false;
        return pathname === url || pathname.startsWith(url + "/");
    }

    return (
        <SidebarGroup {...props}>
            {label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : ""}
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton
                                tooltip={item.name}
                                asChild
                                isActive={isActive(item.url)}
                            >
                                <NavLink to={item.url} target={item.is_blank ? "_blank" : "_self"}>
                                    <item.icon className={item.iconClassName} />
                                    <span className={item.iconClassName}>{item.name}</span>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
