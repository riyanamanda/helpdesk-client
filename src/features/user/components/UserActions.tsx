import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants";
import { PERMISSIONS } from "@/constants/permissions";
import { useHasPermission } from "@/hooks/use-current-user";
import { MoreHorizontalIcon } from "lucide-react";
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
    const canUpdate = useHasPermission(PERMISSIONS.USER.UPDATE);
    const [passwordOpen, setPasswordOpen] = useState(false);

    if (!canUpdate) return null;

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
                            {t("actions.edit")}
                        </NavLink>
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={() => setPasswordOpen(true)}>
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
