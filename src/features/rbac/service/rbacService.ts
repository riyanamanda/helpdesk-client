import { http } from "@/api";
import type { Permission, Role } from "../types";

export const rbacService = {
    listRoles: async (signal?: AbortSignal): Promise<{ data: Role[] }> => {
        const response = await http.get("/api/v1/roles", { signal });
        return response.data;
    },

    listPermissions: async (signal?: AbortSignal): Promise<{ data: Permission[] }> => {
        const response = await http.get("/api/v1/permissions", { signal });
        return response.data;
    },

    getRolePermissions: async (
        roleId: number,
        signal?: AbortSignal
    ): Promise<{ data: Permission[] }> => {
        const response = await http.get(`/api/v1/roles/${roleId}/permissions`, { signal });
        return response.data;
    },

    updateRolePermissions: async (
        roleId: number,
        permissionIds: number[],
        signal?: AbortSignal
    ): Promise<void> => {
        await http.put(`/api/v1/roles/${roleId}/permissions`, {
            permission_ids: permissionIds,
            signal,
        });
    },
};
