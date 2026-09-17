import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface SearchInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
    value: string;
    onValueChange: (value: string) => void;
}

export function SearchInput({ value, onValueChange, className, ...props }: SearchInputProps) {
    const { t } = useTranslation("common");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const clear = () => {
        onValueChange("");
        inputRef.current?.focus();
    };

    return (
        <div className={cn("relative max-w-xs flex-1", className)}>
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
                ref={inputRef}
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Escape" && value) {
                        e.preventDefault();
                        clear();
                    }
                }}
                className="pr-8 pl-8"
                {...props}
            />
            {value && (
                <button
                    type="button"
                    onClick={clear}
                    aria-label={t("actions.clearSearch")}
                    className="absolute top-1/2 right-1.5 flex size-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                    <XIcon className="size-3.5" />
                </button>
            )}
        </div>
    );
}
