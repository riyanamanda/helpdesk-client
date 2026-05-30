import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
    return (
        <div className="mx-auto max-w-2xl space-y-4">
            <Card>
                <CardContent className="flex items-center gap-6 pt-6 pb-6">
                    <Skeleton className="size-20 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="space-y-4 pt-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-9 w-28" />
                </CardContent>
            </Card>
        </div>
    );
}
