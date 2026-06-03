import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getInitials } from "@/lib/formatters";
import { resolveMediaUrl } from "@/lib/media-url";
import { useState } from "react";
import type { User } from "../types";

interface UserAvatarCellProps {
    user: User;
}

export function UserAvatarCell({ user }: UserAvatarCellProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Avatar
                className="cursor-pointer transition-opacity hover:opacity-80"
                onClick={() => setOpen(true)}
            >
                <AvatarImage src={resolveMediaUrl(user.avatar_url)} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="flex flex-col items-center gap-4 sm:max-w-sm">
                    {user.avatar_url ? (
                        <img
                            src={resolveMediaUrl(user.avatar_url)}
                            alt={user.name}
                            className="size-48 rounded-full object-cover ring-2 ring-border"
                        />
                    ) : (
                        <Avatar className="size-48 text-4xl">
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                    )}
                    <div className="text-center">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
