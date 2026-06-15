import { meQueryOption } from "@/features/auth/queries/auth.query";
import { useQuery } from "@tanstack/react-query";
import { COOKIES } from "@/constants";
import { cookies } from "@/lib/cookies";

export function useCurrentUser() {
    const token = cookies.get(COOKIES.TOKEN_KEY);
    const { data } = useQuery({ ...meQueryOption(), enabled: !!token });
    return data?.data ?? null;
}

export function useIsAdmin() {
    const user = useCurrentUser();
    return user?.role?.name === "ADMIN";
}

export function useHasPermission(...permissions: string[]) {
    const user = useCurrentUser();
    if (!user) return false;
    return permissions.some((p) => user.permissions?.includes(p));
}
