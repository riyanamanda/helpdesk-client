import type { RoleName } from "@/features/user/types";

export const ROLE_META: Record<RoleName, { label: string; className: string }> = {
    SUPERADMIN: {
        label: "Super Admin",
        className: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
    },
    ADMIN: {
        label: "Admin",
        className: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    },
    EMPLOYEE: {
        label: "Employee",
        className: "bg-secondary text-secondary-foreground",
    },
};
