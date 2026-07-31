import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PERMISSIONS } from "@/constants/permissions";
import { useHasPermission } from "@/hooks/use-current-user";
import { ChevronDownIcon, EyeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Feedback, FeedbackStatus, FeedbackType } from "../types";
import { UpdateFeedbackStatusPopover } from "./UpdateFeedbackStatusPopover";

const TYPE_CLASS: Record<FeedbackType, string> = {
    FEATURE_REQUEST: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    IMPROVEMENT: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
    BUG_REPORT: "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400",
};

const STATUS_CLASS: Record<FeedbackStatus, string> = {
    OPEN: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    IN_REVIEW: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
    ACCEPTED: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    REJECTED: "bg-destructive/10 text-destructive dark:bg-destructive/20",
    DELIVERED: "bg-secondary text-secondary-foreground",
};

export function FeedbackTypeBadge({ type }: { type: FeedbackType }) {
    const { t } = useTranslation("feedback");
    return <Badge className={TYPE_CLASS[type]}>{t(`type.${type}`)}</Badge>;
}

export function FeedbackStatusBadge({ status }: { status: FeedbackStatus }) {
    const { t } = useTranslation("feedback");
    return <Badge className={STATUS_CLASS[status]}>{t(`status.${status}`)}</Badge>;
}

export function FeedbackDescriptionCell({ feedback }: { feedback: Feedback }) {
    const { t } = useTranslation("feedback");
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="group h-auto max-w-xs justify-start gap-2 px-0 text-left font-normal"
                >
                    <span className="line-clamp-1 text-sm text-muted-foreground group-hover:underline group-hover:underline-offset-2">
                        {feedback.description}
                    </span>
                    <EyeIcon className="size-3.5 shrink-0 text-muted-foreground/50 group-hover:text-muted-foreground" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex flex-wrap items-center gap-2 pr-6">
                        <FeedbackTypeBadge type={feedback.type} />
                        <FeedbackStatusBadge status={feedback.status} />
                    </div>
                    <DialogTitle>{feedback.title}</DialogTitle>
                    <DialogDescription className="text-sm leading-relaxed whitespace-pre-wrap">
                        {feedback.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="text-xs text-muted-foreground">
                    {t("columns.submittedBy")}: {feedback.created_by.name}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function FeedbackStatusCell({ feedback }: { feedback: Feedback }) {
    const canUpdate =
        useHasPermission(PERMISSIONS.FEEDBACK.UPDATE) &&
        !["delivered", "rejected"].includes(feedback.status.toLocaleLowerCase());
    if (!canUpdate) return <FeedbackStatusBadge status={feedback.status} />;
    return (
        <UpdateFeedbackStatusPopover
            feedbackId={feedback.id}
            currentStatus={feedback.status}
            trigger={
                <button className="flex cursor-pointer items-center gap-1">
                    <FeedbackStatusBadge status={feedback.status} />
                    <ChevronDownIcon className="h-3 w-3 opacity-50" />
                </button>
            }
        />
    );
}
