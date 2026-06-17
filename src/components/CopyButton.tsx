import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setCopied(false);
        }, 1200);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [copied]);

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="cursor-pointer transition-all"
            onClick={async () => {
                await navigator.clipboard.writeText(text);
                setCopied(true);
            }}
            aria-label="Salin nomor ponsel"
        >
            {copied ? (
                <CheckIcon className="size-3.5 animate-in text-emerald-600 duration-200 zoom-in-50" />
            ) : (
                <CopyIcon className="size-3.5" />
            )}
        </Button>
    );
}
