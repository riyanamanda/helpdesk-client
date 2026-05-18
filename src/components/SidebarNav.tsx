import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";
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
    }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    return (
        <SidebarGroup {...props}>
            {label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : ""}
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton tooltip={item.name} asChild>
                                <NavLink
                                    to={item.url}
                                    target={item.is_blank ? "_blank" : "_self"}
                                >
                                    <item.icon />
                                    <span>{item.name}</span>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
