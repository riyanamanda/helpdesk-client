import { COOKIES, ROUTES } from "@/constants";
import { meQueryOption } from "@/features/auth/queries/auth.query";
import { cookies } from "@/lib/cookies";
import { getInitials } from "@/lib/formatters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOutIcon, UserCircleIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { ModeToggle } from "../ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
    const queryClient = useQueryClient();

    const { data: userData, isFetching } = useQuery(meQueryOption());
    const user = userData.data;

    const logout = () => {
        cookies.remove(COOKIES.TOKEN_KEY, { path: COOKIES.PATH });

        queryClient.removeQueries({
            queryKey: meQueryOption().queryKey,
        });

        return navigate(ROUTES.LOGIN, { replace: true });
    };

    if (isFetching) {
        return null;
    }

    return (
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex w-full items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" size="icon-lg" />

                <div className="ml-auto">
                    <ModeToggle />
                </div>

                <Separator orientation="vertical" className="mx-2" />

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex cursor-pointer gap-3">
                        <Avatar className="size-8 rounded-lg">
                            <AvatarImage src={user.avatar_url} alt={user.name} />
                            <AvatarFallback className="rounded-lg">
                                {user && getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{user.name}</span>
                            <span className="truncate text-xs text-muted-foreground">
                                {user.role}
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
                                Profile
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="text-destructive">
                            <LogOutIcon />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
