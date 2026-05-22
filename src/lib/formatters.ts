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
