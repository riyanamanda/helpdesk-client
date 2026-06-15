import { http } from "@/api";
import type { Permission, Role } from "../types";

export const rbacService = {
    listRoles: async (): Promise<{ data: Role[] }> => {
        const response = await http.get("/api/v1/roles");
        return response.data;
    },

    listPermissions: async (): Promise<{ data: Permission[] }> => {
        const response = await http.get("/api/v1/permissions");
        return response.data;
    },

    getRolePermissions: async (roleId: number): Promise<{ data: Permission[] }> => {
        const response = await http.get(`/api/v1/roles/${roleId}/permissions`);
        return response.data;
    },

    updateRolePermissions: async (roleId: number, permissionIds: number[]): Promise<void> => {
        await http.put(`/api/v1/roles/${roleId}/permissions`, { permission_ids: permissionIds });
    },
};
