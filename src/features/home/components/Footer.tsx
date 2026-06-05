import { useTranslation } from "react-i18next";

export function Footer() {
    const { t } = useTranslation("home");

    return (
        <footer className="relative z-10 flex-none border-t border-border/40 py-3">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{t("footer.appName")}</span>

                    <span>· {t("footer.tagline")}</span>
                </div>

                <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
            </div>
        </footer>
    );
}
