import { CopyButton } from "@/components/CopyButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/formatters";
import { MapPinIcon, UserRoundIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PatientDetail } from "../types";
import { Field, FieldSkeleton } from "./Field";
import { cn } from "@/lib/utils";

interface Props {
    title: string; // Misal: "SIMGOS" atau "BPJS"
    className?: string;
    patient?: PatientDetail;
    isLoading: boolean;
}

export function PatientBioCard({ title, className, patient, isLoading }: Props) {
    const { t } = useTranslation("ihs");

    return (
        <Card
            className={cn(
                "flex flex-col overflow-hidden border border-border/60 shadow-2xs",
                className
            )}
        >
            {/* Header System Banner */}
            <div className="flex items-center justify-between border-b border-border/50 bg-muted/40 px-3.5 py-1.5">
                <div className="flex items-center gap-1.5">
                    <UserRoundIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
                    <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                        {title}
                    </span>
                </div>
                {patient && !isLoading && (
                    <Badge
                        variant={patient.status ? "success" : "destructive"}
                        className="h-4 px-1.5 text-[9px]"
                    >
                        {patient.status ? t("detail.status.active") : t("detail.status.inactive")}
                    </Badge>
                )}
            </div>

            <CardContent className="flex-1 space-y-3 p-3.5 text-xs">
                {isLoading || !patient ? (
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-48" />
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border/40 pt-2">
                            <FieldSkeleton wide />
                            <FieldSkeleton />
                            <FieldSkeleton />
                            <FieldSkeleton />
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Section Header Pasien (Nama, NORM & NIK) */}
                        <div className="space-y-1 border-b border-border/40 pb-2">
                            <h3 className="truncate text-sm font-semibold tracking-tight text-foreground">
                                {patient.name || "-"}
                            </h3>

                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <span className="font-medium text-foreground/50">NORM</span>
                                    <span className="font-mono font-bold text-primary">
                                        {patient.norm || "-"}
                                    </span>
                                    {patient.norm && <CopyButton text={patient.norm} />}
                                </span>

                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <span className="font-medium text-foreground/50">NIK</span>
                                    <span className="font-mono font-bold text-primary">
                                        {patient.identity_card?.identity_number || "-"}
                                    </span>
                                    {patient.identity_card?.identity_number && (
                                        <CopyButton text={patient.identity_card.identity_number} />
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Section Biodata Pasien */}
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                            <div>
                                <p className="text-[10px] font-medium text-muted-foreground/70 uppercase">
                                    {t("detail.bio.birthPlace")}
                                </p>
                                {patient.birth_place ? (
                                    <p className="truncate font-medium text-foreground">
                                        {patient.birth_place}
                                    </p>
                                ) : (
                                    <Badge
                                        variant="outline"
                                        className="h-4 border-amber-500/30 bg-amber-500/10 px-1.5 text-[9px] font-normal text-amber-600"
                                    >
                                        {t("detail.bio.birthPlaceNull")}
                                    </Badge>
                                )}
                            </div>

                            <Field
                                label={t("detail.bio.birthDate")}
                                value={
                                    patient.birth_date ? formatDate(patient.birth_date) : undefined
                                }
                            />
                            <Field
                                label={t("detail.bio.maritalStatus")}
                                value={patient.marital_status}
                            />
                            <Field
                                label={t("detail.bio.citizenship")}
                                value={patient.citizenship}
                            />
                        </div>

                        {/* Section Alamat KTP Pasien */}
                        <div className="border-t border-border/40 pt-2">
                            <div className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground/80">
                                <MapPinIcon className="h-3 w-3" />
                                <span>{t("detail.ktp.title", "Alamat KTP")}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                                <Field
                                    label={t("detail.ktp.address")}
                                    value={patient.identity_card?.address}
                                    wide
                                />
                                <Field
                                    label={t("detail.ktp.rt")}
                                    value={patient.identity_card?.rt}
                                />
                                <Field
                                    label={t("detail.ktp.rw")}
                                    value={patient.identity_card?.rw}
                                />
                                <Field
                                    label={t("detail.ktp.village")}
                                    value={patient.identity_card?.sub_district}
                                />
                                <Field
                                    label={t("detail.ktp.district")}
                                    value={patient.identity_card?.district}
                                />
                                <Field
                                    label={t("detail.ktp.city")}
                                    value={patient.identity_card?.city}
                                />
                                <Field
                                    label={t("detail.ktp.province")}
                                    value={patient.identity_card?.province}
                                />
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
