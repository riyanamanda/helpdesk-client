import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants";
import { EditIcon, KeyRoundIcon, MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import type { User } from "../types";
import { UpdateUserPasswordDialog } from "./UpdateUserPasswordDialog";

interface UserActionsProps {
    user: User;
}

export function UserActions({ user }: UserActionsProps) {
    const { t } = useTranslation("user");
    const [passwordOpen, setPasswordOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-44 rounded-lg"
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuItem asChild>
                        <NavLink to={ROUTES.USER.EDIT.replace(":id", user.id)}>
                            <EditIcon />
                            {t("actions.edit")}
                        </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setPasswordOpen(true)}>
                        <KeyRoundIcon />
                        {t("actions.changePassword")}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <UpdateUserPasswordDialog
                user={user}
                open={passwordOpen}
                onOpenChange={setPasswordOpen}
            />
        </>
    );
}
