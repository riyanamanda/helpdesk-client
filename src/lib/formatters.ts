import { formatDistanceToNow } from "date-fns";
import { enUS, id } from "date-fns/locale";

export const getInitials = (name: string): string => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};

export const formatDate = (
    date: string | Date | undefined | null,
    locale: string = "id-ID",
    options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
    }
): string => {
    if (!date) return "-";
    const dateObj =
        typeof date === "string" ? new Date(date.includes("T") ? date : date + "T00:00:00") : date;
    return dateObj.toLocaleDateString(locale, options);
};

export const formatRelativeDate = (
    date: string | Date | undefined | null,
    currentLocale: "id" | "en" = "id"
): string => {
    if (!date) return "-";

    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "-";

    const localeMap = {
        id: id,
        en: enUS,
    };

    return formatDistanceToNow(dateObj, {
        addSuffix: true,
        locale: localeMap[currentLocale],
    });
};
