import { Badge } from "@/components/ui/badge";
import { CircleCheckBigIcon, CircleXIcon } from "lucide-react";

interface ActiveStatusBadgeProps {
    isActive: boolean;
    activeLabel: string;
    inactiveLabel: string;
}

export function ActiveStatusBadge({
    isActive,
    activeLabel,
    inactiveLabel,
}: ActiveStatusBadgeProps) {
    return (
        <Badge variant={isActive ? "success" : "destructive"} className="px-1.5">
            {isActive ? (
                <>
                    <CircleCheckBigIcon />
                    {activeLabel}
                </>
            ) : (
                <>
                    <CircleXIcon />
                    {inactiveLabel}
                </>
            )}
        </Badge>
    );
}
