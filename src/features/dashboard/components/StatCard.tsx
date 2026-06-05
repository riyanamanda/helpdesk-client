import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReactNode } from "react";

interface StatCardProps {
    label: string;
    value: number | undefined;
    icon: ReactNode;
    valueClass?: string;
    iconClass?: string;
    isLoading: boolean;
}

export function StatCard({
    label,
    value,
    icon,
    valueClass = "",
    iconClass = "bg-muted text-muted-foreground",
    isLoading,
}: StatCardProps) {
    return (
        <Card>
            <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground">{label}</span>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <span className={`text-3xl font-bold ${valueClass}`}>{value ?? 0}</span>
                        )}
                    </div>
                    <div className={`rounded-md p-2 ${iconClass}`}>{icon}</div>
                </div>
            </CardContent>
        </Card>
    );
}
