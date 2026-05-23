import { Spinner } from "./ui/spinner";

interface ComponentLoadingProps {
    text: string;
}

export function ComponentLoading({ text }: ComponentLoadingProps) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-background">
            <div className="relative size-20">
                <span className="absolute inset-0 animate-ping rounded-full border-2 border-primary/30" />
                <span className="absolute inset-0 rounded-full border border-primary/10" />
                <Spinner className="absolute inset-0 m-auto size-9 text-primary" />
            </div>
            <div className="flex flex-col items-center gap-1">
                <p className="text-base font-semibold tracking-tight">Helpdesk</p>
                <p className="text-sm text-muted-foreground">{text}</p>
            </div>
        </div>
    );
}
