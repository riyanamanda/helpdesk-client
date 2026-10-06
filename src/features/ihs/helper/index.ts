export function isTextMatch(val1?: string | null, val2?: string | null): boolean {
    if (!val1 || !val2) return true;
    const clean1 = val1.trim().replace(/\s+/g, " ").toLowerCase();
    const clean2 = val2.trim().replace(/\s+/g, " ").toLowerCase();
    return clean1 === clean2;
}

export function isDateMatch(date1?: string | null, date2?: string | null): boolean {
    if (!date1 || !date2) return true;
    const d1 = date1.split("T")[0];
    const d2 = date2.split("T")[0];
    return d1 === d2;
}

export function extractBirthDateFromNIK(nik?: string | null): string | null {
    if (!nik || nik.length !== 16 || !/^\d+$/.test(nik)) return null;

    let day = parseInt(nik.substring(6, 8), 10);
    const month = nik.substring(8, 10);
    const year = parseInt(nik.substring(10, 12), 10);

    if (day > 40) {
        day -= 40;
    }

    const currentYearTwoDigits = new Date().getFullYear() % 100;
    const century = year > currentYearTwoDigits ? "19" : "20";
    const fullYear = `${century}${year.toString().padStart(2, "0")}`;
    const formattedDay = day.toString().padStart(2, "0");

    return `${fullYear}-${month}-${formattedDay}`;
}

export function isNikMatchBirthDate(nik?: string | null, birthDate?: string | null): boolean {
    const extractedDate = extractBirthDateFromNIK(nik);
    if (!extractedDate || !birthDate) return true;

    return extractedDate === birthDate.split("T")[0];
}
