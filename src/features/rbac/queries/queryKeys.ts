const RBAC_ROOT_KEY = ["rbac"] as const;

export const RBAC_QUERY_KEYS = {
    ROOT: RBAC_ROOT_KEY,
    ROLES: [...RBAC_ROOT_KEY, "roles"] as const,
    PERMISSIONS: [...RBAC_ROOT_KEY, "permissions"] as const,
    ROLE_PERMISSIONS: (roleId: number) =>
        [...RBAC_ROOT_KEY, "roles", roleId, "permissions"] as const,
};
