import { CONFIG } from "@/constants";

const ABSOLUTE_URL_SCHEME_REGEX = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

function getApiOrigin(): string | null {
    const apiBaseUrl = CONFIG.API_BASE_URL;

    if (!apiBaseUrl) {
        return null;
    }

    try {
        return new URL(apiBaseUrl, window.location.origin).origin;
    } catch {
        return null;
    }
}

export function resolveMediaUrl(url?: string | null): string | undefined {
    if (!url) {
        return undefined;
    }

    if (ABSOLUTE_URL_SCHEME_REGEX.test(url)) {
        return url;
    }

    const baseUrl = getApiOrigin() ?? window.location.origin;

    try {
        return new URL(url, baseUrl).toString();
    } catch {
        return url;
    }
}
