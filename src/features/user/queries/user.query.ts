import { queryOptions } from "@tanstack/react-query";
import { userService } from "../service/userService";
import type { UserListParams } from "../types";
import { USER_QUERY_KEYS } from "./queryKeys";

export function listUserQueryOption(params: UserListParams = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: USER_QUERY_KEYS.LIST(params),
        queryFn: () => userService.list(params),
    });
}

export function getUserQueryOption(id: string) {
    return queryOptions({
        queryKey: USER_QUERY_KEYS.GET(id),
        queryFn: () => userService.get(id),
    });
}

export function listAssignableUserQueryOption() {
    return queryOptions({
        queryKey: USER_QUERY_KEYS.ASSIGNABLE_USER,
        queryFn: () => userService.listAssignableUser(),
    });
}
