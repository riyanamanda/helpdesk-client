const ABSOLUTE_URL_SCHEME_REGEX = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

export function resolveMediaUrl(url?: string | null): string | undefined {
    if (!url) {
        return undefined;
    }

    if (ABSOLUTE_URL_SCHEME_REGEX.test(url)) {
        return url;
    }

    try {
        return new URL(url, window.location.origin).toString();
    } catch {
        return url;
    }
}
