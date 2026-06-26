import { PageLayout } from "@/components/layout/PageLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { UserIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PermissionPanel } from "../components/PermissionPanel";
import { listPermissionsQueryOption, listRolesQueryOption } from "../queries/rbac.query";

export function RbacPage() {
    const { t } = useTranslation("rbac");
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

    const { data: rolesData, isLoading: rolesLoading } = useQuery(listRolesQueryOption());
    const { data: permissionsData } = useQuery(listPermissionsQueryOption());

    const roles = useMemo(() => {
        const data = rolesData?.data ?? [];
        return [...data]
            .filter((r) => r.code !== "SUPERADMIN")
            .sort((a, b) => (a.code === "EMPLOYEE" ? -1 : b.code === "EMPLOYEE" ? 1 : 0));
    }, [rolesData]);
    const allPermissions = useMemo(() => permissionsData?.data ?? [], [permissionsData]);

    const effectiveRoleId = selectedRoleId ?? roles[0]?.id ?? null;
    const effectiveRole = roles.find((r) => r.id === effectiveRoleId);

    return (
        <PageLayout>
            <PageLayout.Header title={t("page.title")} description={t("page.description")} />
            <PageLayout.Content>
                <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                    <div>
                        <p className="mb-3 px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            {t("roles.listTitle")}
                        </p>
                        {rolesLoading ? (
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-12 w-full rounded-lg" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {roles.map((role) => {
                                    const isSelected = effectiveRoleId === role.id;
                                    return (
                                        <button
                                            key={role.id}
                                            onClick={() => setSelectedRoleId(role.id)}
                                            className={cn(
                                                "flex items-center justify-between rounded-lg px-4 py-3 text-left transition-colors",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "border bg-card hover:bg-accent hover:text-accent-foreground"
                                            )}
                                        >
                                            <span className="text-sm font-semibold tracking-wide uppercase">
                                                {role.code}
                                            </span>
                                            <UserIcon className="h-4 w-4 opacity-60" />
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {effectiveRoleId !== null && effectiveRole && (
                        <PermissionPanel
                            key={effectiveRoleId}
                            roleId={effectiveRoleId}
                            roleName={effectiveRole.code}
                            allPermissions={allPermissions}
                        />
                    )}
                </div>
            </PageLayout.Content>
        </PageLayout>
    );
}
