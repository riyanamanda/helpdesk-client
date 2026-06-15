import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RBAC_QUERY_KEYS } from "../queries";
import { rbacService } from "../service/rbacService";

export function useUpdateRolePermissionsMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ roleId, permissionIds }: { roleId: number; permissionIds: number[] }) =>
            rbacService.updateRolePermissions(roleId, permissionIds),
        onSuccess: (_, { roleId }) => {
            queryClient.invalidateQueries({
                queryKey: RBAC_QUERY_KEYS.ROLE_PERMISSIONS(roleId),
            });
        },
    });
}
