import { useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { listDivisionOptionsQueryOption } from "../queries/division.query";

interface DivisionComboboxProps {
    value?: number;
    onChange: (value: number | undefined) => void;
    disabled?: boolean;
}

export function DivisionCombobox({ value, onChange, disabled }: DivisionComboboxProps) {
    const { t } = useTranslation("user");
    const [open, setOpen] = useState(false);

    const { data } = useQuery(listDivisionOptionsQueryOption());
    const options = data?.data ?? [];

    const selected = options.find((d) => d.id === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                        "h-8 w-full justify-between rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm font-normal",
                        !selected && "text-muted-foreground"
                    )}
                >
                    {selected ? selected.name : t("create.divisionPlaceholder")}
                    <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 text-muted-foreground" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
                <Command>
                    <CommandInput placeholder={t("create.divisionSearchPlaceholder")} />
                    <CommandList>
                        <CommandEmpty>{t("create.divisionNotFound")}</CommandEmpty>
                        <CommandGroup>
                            {options.map((d) => (
                                <CommandItem
                                    key={d.id}
                                    value={d.name}
                                    onSelect={() => {
                                        onChange(d.id === value ? undefined : d.id);
                                        setOpen(false);
                                    }}
                                >
                                    {d.name}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto size-4",
                                            value === d.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
