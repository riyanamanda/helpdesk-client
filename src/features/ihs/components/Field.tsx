import { Skeleton } from "@/components/ui/skeleton";

export function Field({ label, value, wide }: { label: string; value?: string; wide?: boolean }) {
    return (
        <div className={wide ? "col-span-2" : undefined}>
            <p className="mb-0.5 text-[10px] font-semibold tracking-widest text-muted-foreground/50 uppercase">
                {label}
            </p>
            <p className="text-sm font-medium text-foreground">{value ?? "—"}</p>
        </div>
    );
}

export function FieldSkeleton({ wide }: { wide?: boolean }) {
    return (
        <div className={wide ? "col-span-2 space-y-1.5" : "space-y-1.5"}>
            <Skeleton className="h-2.5 w-14" />
            <Skeleton className="h-4 w-28" />
        </div>
    );
}
