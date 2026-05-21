import { queryOptions } from "@tanstack/react-query";
import { authService } from "../service/authService";
import { AUTH_QUERY_KEYS } from "./queryKeys";

export function meQueryOption() {
    return queryOptions({
        queryKey: AUTH_QUERY_KEYS.ME,
        queryFn: () => authService.me(),
        retry: false,
    });
}
