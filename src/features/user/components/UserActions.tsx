import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants";
import { MoreHorizontalIcon, PencilIcon } from "lucide-react";
import { NavLink } from "react-router";
import type { User } from "../types";

interface UserActionsProps {
    user: User;
}

export function UserActions({ user }: UserActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <NavLink to={ROUTES.USER.EDIT.replace(":id", user.id)}>
                        <PencilIcon className="size-3.5" />
                        Edit
                    </NavLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
