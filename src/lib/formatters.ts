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

export const formatDateTime = (date: string | Date | undefined | null): string => {
    if (!date) return "-";

    const dateStr = typeof date === "string" ? date : date.toISOString();
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!match) return "-";

    const [, year, month, day, hour, minute] = match;

    return `${day}/${month}/${year}, ${hour}.${minute}`;
};

export const formatRelativeDate = (
    date: string | Date | undefined | null,
    currentLanguage: string = "id"
): string => {
    if (!date) return "-";

    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "-";

    const localeMap = {
        id: id,
        en: enUS,
    };

    const normalizedLocale = currentLanguage.toLowerCase().startsWith("id") ? "id" : "en";

    return formatDistanceToNow(dateObj, {
        addSuffix: true,
        locale: localeMap[normalizedLocale],
    });
};

export const formatName = (fullname: string) => {
    const words = fullname.trim().split(/\s+/);

    if (words.length <= 2) return fullname;

    const firstname = words.shift();
    const lastname = words.pop();
    const middleInitials = words.map((word) => `${word.charAt(0)}.`);

    return `${firstname} ${middleInitials.join("")} ${lastname}`;
};
