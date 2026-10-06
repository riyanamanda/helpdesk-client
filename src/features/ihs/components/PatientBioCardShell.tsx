import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { UserRoundIcon } from "lucide-react";
import type { ReactNode } from "react";
import { FieldSkeleton } from "./Field";

interface Props {
    title: string;
    className?: string;
    badge?: ReactNode;
    isLoading: boolean;
    children: ReactNode;
}

export function PatientBioCardShell({ title, className, badge, isLoading, children }: Props) {
    return (
        <Card
            className={cn(
                "flex h-fit flex-col overflow-hidden border border-border/60 shadow-2xs",
                className
            )}
        >
            <div className="flex items-center justify-between border-b border-border/50 bg-muted/40 px-3.5 py-1.5">
                <div className="flex items-center gap-1.5">
                    <UserRoundIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
                    <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                        {title}
                    </span>
                </div>
                {!isLoading && badge}
            </div>

            <CardContent className="flex-1 space-y-2.5 p-3.5 text-xs">
                {isLoading ? (
                    <div className="space-y-2.5">
                        <div className="space-y-1">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-48" />
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border/40 pt-2">
                            <FieldSkeleton wide />
                            <FieldSkeleton />
                            <FieldSkeleton />
                            <FieldSkeleton />
                        </div>
                    </div>
                ) : (
                    children
                )}
            </CardContent>
        </Card>
    );
}

interface StatusBadgeProps {
    active: boolean;
    children: ReactNode;
}

export function PatientStatusBadge({ active, children }: StatusBadgeProps) {
    return (
        <Badge variant={active ? "success" : "destructive"} className="h-4 px-1.5 text-[9px]">
            {children}
        </Badge>
    );
}
