import { queryOptions } from "@tanstack/react-query";
import { rbacService } from "../service/rbacService";
import { RBAC_QUERY_KEYS } from "./queryKeys";

export function listRolesQueryOption() {
    return queryOptions({
        queryKey: RBAC_QUERY_KEYS.ROLES,
        queryFn: ({ signal }) => rbacService.listRoles(signal),
    });
}

export function listPermissionsQueryOption() {
    return queryOptions({
        queryKey: RBAC_QUERY_KEYS.PERMISSIONS,
        queryFn: ({ signal }) => rbacService.listPermissions(signal),
    });
}

export function getRolePermissionsQueryOption(roleId: number) {
    return queryOptions({
        queryKey: RBAC_QUERY_KEYS.ROLE_PERMISSIONS(roleId),
        queryFn: ({ signal }) => rbacService.getRolePermissions(roleId, signal),
    });
}
