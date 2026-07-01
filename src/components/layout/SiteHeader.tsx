import { ROUTES } from "@/constants";
import { useLogoutMutation } from "@/features/auth/mutation/auth.mutation";
import { meQueryOption } from "@/features/auth/queries/auth.query";
import { NotificationBell } from "@/features/notification/components/NotificationBell";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { formatName, getInitials } from "@/lib/formatters";
import { resolveMediaUrl } from "@/lib/media-url";
import { ROLE_META } from "@/lib/role";
import { useQuery } from "@tanstack/react-query";
import { DownloadIcon, KeyRoundIcon, LogOutIcon, UserCircleIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ModeToggle } from "../ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export function SiteHeader() {
    const navigate = useNavigate();
    const { t } = useTranslation("auth");
    const { data: userData, isFetching } = useQuery(meQueryOption());
    const { mutate: logout } = useLogoutMutation();
    const { canInstall, install } = usePWAInstall();
    const user = userData?.data;

    if (isFetching || !user) {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-transparent backdrop-blur-md">
            <div className="flex w-full items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" size="icon-lg" />

                <div className="ml-auto flex items-center gap-2">
                    {canInstall && (
                        <Button variant="outline" size="sm" onClick={install}>
                            <DownloadIcon />
                            {t("header.install")}
                        </Button>
                    )}
                    <NotificationBell />
                    <LanguageSwitcher />
                    <ModeToggle />
                </div>

                <Separator orientation="vertical" className="mx-2" />

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex cursor-pointer gap-3">
                        <Avatar className="size-8 rounded-lg">
                            <AvatarImage src={resolveMediaUrl(user.avatar_url)} alt={user.name} />
                            <AvatarFallback className="rounded-lg">
                                {user && getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{formatName(user.name)}</span>
                            <span className="truncate text-xs font-semibold text-primary">
                                {ROLE_META[user.role.name].label}
                            </span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => navigate(ROUTES.PROFILE)}
                            >
                                <UserCircleIcon />
                                {t("header.profile")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => navigate(ROUTES.PROFILE_UPDATE_PASSWORD)}
                            >
                                <KeyRoundIcon />
                                {t("header.changePassword")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                            <LogOutIcon />
                            {t("header.logout")}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
