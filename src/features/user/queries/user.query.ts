import { queryOptions } from "@tanstack/react-query";
import { userService } from "../service/userService";
import type { UserListParams } from "../types";
import { USER_QUERY_KEYS } from "./queryKeys";

export function listUserQueryOption(params: UserListParams = { page: 1, limit: 10 }) {
    return queryOptions({
        queryKey: USER_QUERY_KEYS.LIST(params),
        queryFn: ({ signal }) => userService.list(params, signal),
    });
}

export function getUserQueryOption(id: string) {
    return queryOptions({
        queryKey: USER_QUERY_KEYS.GET(id),
        queryFn: ({ signal }) => userService.get(id, signal),
    });
}

export function listAssignableUserQueryOption() {
    return queryOptions({
        queryKey: USER_QUERY_KEYS.ASSIGNABLE_USER,
        queryFn: ({ signal }) => userService.listAssignableUser(signal),
    });
}
