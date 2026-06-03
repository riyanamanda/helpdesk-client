import { GlobeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LANGUAGES = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "id", label: "Indonesia", flag: "🇮🇩" },
] as const;

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language.startsWith("id") ? "id" : "en";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer">
                    <GlobeIcon className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {LANGUAGES.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => i18n.changeLanguage(lang.code)}
                        className="cursor-pointer"
                        aria-current={currentLang === lang.code ? "true" : undefined}
                    >
                        <span>{lang.flag}</span>
                        {lang.label}
                        {currentLang === lang.code && (
                            <span className="ml-auto text-xs text-muted-foreground">✓</span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
