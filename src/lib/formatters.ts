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

    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (Number.isNaN(dateObj.getTime())) return "-";

    const parts = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).formatToParts(dateObj);

    const getPart = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value;
    const day = getPart("day");
    const month = getPart("month");
    const year = getPart("year");
    const hour = getPart("hour");
    const minute = getPart("minute");

    if (!day || !month || !year || !hour || !minute) return "-";

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
