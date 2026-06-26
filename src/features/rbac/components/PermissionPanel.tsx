import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { handleApiError } from "@/lib/handle-form-error";
import { useQuery } from "@tanstack/react-query";
import {
    BlocksIcon,
    GaugeIcon,
    ListOrderedIcon,
    MessageSquareTextIcon,
    PresentationIcon,
    ShieldIcon,
    TicketIcon,
    UserIcon,
    type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useUpdateRolePermissionsMutation } from "../mutation/rbac.mutation";
import { getRolePermissionsQueryOption } from "../queries/rbac.query";
import type { Permission } from "../types";

export function PermissionPanel({
    roleId,
    roleName,
    allPermissions,
}: {
    roleId: number;
    roleName: string;
    allPermissions: Permission[];
}) {
    const { t } = useTranslation("rbac");
    const { data: rolePermsData, isLoading } = useQuery(getRolePermissionsQueryOption(roleId));
    const mutation = useUpdateRolePermissionsMutation();

    const serverPermIds = useMemo(
        () => new Set((rolePermsData?.data ?? []).map((p) => p.id)),
        [rolePermsData]
    );

    const MODULE_ICONS: Record<string, LucideIcon> = {
        category: BlocksIcon,
        division: PresentationIcon,
        user: UserIcon,
        ticket: TicketIcon,
        feedback: MessageSquareTextIcon,
        dashboard: GaugeIcon,
        rbac: ShieldIcon,
        antrian: ListOrderedIcon,
    };

    type GroupedPermission = Permission & { action: string };

    function groupPermissions(permissions: Permission[]): Record<string, GroupedPermission[]> {
        return permissions.reduce(
            (acc, perm) => {
                const [module, action] = perm.code.split(":");
                if (!acc[module]) acc[module] = [];
                acc[module].push({ ...perm, action });
                return acc;
            },
            {} as Record<string, GroupedPermission[]>
        );
    }

    function setsEqual(a: Set<number>, b: Set<number>) {
        if (a.size !== b.size) return false;
        for (const id of a) if (!b.has(id)) return false;
        return true;
    }

    const [editedPermIds, setEditedPermIds] = useState<Set<number> | null>(null);
    const checkedIds = editedPermIds ?? serverPermIds;
    const isDirty = editedPermIds !== null && !setsEqual(editedPermIds, serverPermIds);

    const grouped = groupPermissions(allPermissions);

    function toggle(id: number, checked: boolean) {
        setEditedPermIds((prev) => {
            const next = new Set(prev ?? serverPermIds);
            if (checked) next.add(id);
            else next.delete(id);
            return next;
        });
    }

    function toggleGroup(perms: GroupedPermission[], checked: boolean) {
        setEditedPermIds((prev) => {
            const next = new Set(prev ?? serverPermIds);
            for (const p of perms) {
                if (checked) next.add(p.id);
                else next.delete(p.id);
            }
            return next;
        });
    }

    function handleSave() {
        mutation.mutate(
            { roleId, permissionIds: [...checkedIds] },
            {
                onSuccess: () => {
                    setEditedPermIds(null);
                    toast.success(t("common:toast.success"), {
                        description: t("editor.updatedSuccess", { roleName }),
                    });
                },
                onError: handleApiError,
            }
        );
    }

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-base font-bold tracking-wide uppercase">
                        {t("editor.title")}
                    </h2>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        {t("editor.subtitle", { roleName })}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {isDirty && (
                        <p className="text-xs text-amber-500">{t("editor.unsavedChanges")}</p>
                    )}
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={!isDirty || mutation.isPending}
                        onClick={() => setEditedPermIds(null)}
                    >
                        {t("editor.discard")}
                    </Button>
                    <Button
                        size="sm"
                        disabled={!isDirty || mutation.isPending}
                        onClick={handleSave}
                    >
                        {mutation.isPending ? t("common:actions.saving") : t("editor.save")}
                    </Button>
                </div>
            </div>

            <Separator className="mb-4" />

            {isLoading ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="rounded-lg border p-4">
                            <Skeleton className="mb-4 h-4 w-32" />
                            <div className="flex flex-col gap-2.5 pl-1">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Object.entries(grouped).map(([module, perms]) => {
                        const ModuleIcon = MODULE_ICONS[module];
                        const label = t(`module.${module}` as Parameters<typeof t>[0]);
                        const groupSelected = perms.filter((p) => checkedIds.has(p.id)).length;
                        const allChecked = groupSelected === perms.length;
                        const someChecked = groupSelected > 0 && !allChecked;

                        return (
                            <div key={module} className="rounded-lg border p-4">
                                <div className="mb-3 flex items-center gap-2 border-b pb-3">
                                    <Checkbox
                                        id={`module-${module}`}
                                        checked={
                                            allChecked
                                                ? true
                                                : someChecked
                                                  ? "indeterminate"
                                                  : false
                                        }
                                        onCheckedChange={(v) => toggleGroup(perms, v === true)}
                                    />
                                    {ModuleIcon && (
                                        <ModuleIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
                                    )}
                                    <label
                                        htmlFor={`module-${module}`}
                                        className="cursor-pointer text-xs font-bold tracking-wide uppercase"
                                    >
                                        {label}
                                    </label>
                                </div>

                                <div className="flex flex-col gap-2 pl-1">
                                    {perms.map((perm) => (
                                        <div key={perm.id} className="flex items-center gap-2">
                                            <Checkbox
                                                id={`perm-${perm.id}`}
                                                checked={checkedIds.has(perm.id)}
                                                onCheckedChange={(v) => toggle(perm.id, v === true)}
                                            />
                                            <label
                                                htmlFor={`perm-${perm.id}`}
                                                className="cursor-pointer text-xs text-muted-foreground capitalize"
                                            >
                                                {perm.action}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
