import Cookies from "universal-cookie";

export const cookies = new Cookies();

export function getJwtExpiry(token: string): Date | undefined {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return new Date(payload.exp * 1000);
    } catch {
        return undefined;
    }
}
