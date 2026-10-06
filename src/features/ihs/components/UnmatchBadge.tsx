import { Badge } from "@/components/ui/badge";
import { AlertTriangleIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function UnmatchBadge({ label }: { label?: string }) {
    const { t } = useTranslation("ihs");

    return (
        <Badge
            variant="outline"
            className="inline-flex h-4 shrink-0 items-center gap-1 border-destructive/40 bg-destructive/10 px-1.5 text-[9px] font-semibold text-destructive dark:bg-destructive/20"
        >
            <AlertTriangleIcon className="h-2.5 w-2.5 text-destructive" />
            {label || t("unmatch.default")}
        </Badge>
    );
}
