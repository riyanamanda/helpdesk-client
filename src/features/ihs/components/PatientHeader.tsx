import { CopyButton } from "@/components/CopyButton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import type { PatientDetail } from "../types";

interface Props {
    patient: PatientDetail;
    isLoading: boolean;
}

export function PatientHeader({ patient, isLoading }: Props) {
    const { t } = useTranslation("ihs");

    return (
        <Card className="overflow-hidden">
            <div className="flex items-center gap-5 p-6">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-52" />
                            <Skeleton className="h-3.5 w-40" />
                            <Skeleton className="h-3.5 w-52" />
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                                    {patient.name}
                                </h2>
                                <Badge variant="success">{t("detail.status.active")}</Badge>
                            </div>

                            <div className="flex flex-wrap gap-x-5 gap-y-1">
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <span className="font-medium text-foreground/50">NORM</span>
                                    <span className="font-mono font-bold text-primary">
                                        {patient.norm}
                                    </span>
                                    <CopyButton text={patient.norm} />
                                </span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <span className="font-medium text-foreground/50">NIK</span>
                                    <span className="font-mono font-bold text-primary">
                                        {patient.nik}
                                    </span>
                                    <CopyButton text={patient.nik} />
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
}
