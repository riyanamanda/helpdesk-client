import { CopyButton } from "@/components/CopyButton";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { isNikMatchBirthDate } from "../helper";
import type { PatientDetail } from "../types";
import { Field } from "./Field";
import { PatientBioCardShell, PatientStatusBadge } from "./PatientBioCardShell";
import { UnmatchBadge } from "./UnmatchBadge";

interface Props {
    title: string;
    className?: string;
    patient?: PatientDetail;
    isLoading: boolean;
}

export function PatientBioCard({ title, className, patient, isLoading }: Props) {
    const { t } = useTranslation("ihs");

    const isNikValidWithBirthDate = isNikMatchBirthDate(
        patient?.identity_card?.identity_number,
        patient?.birth_date
    );

    return (
        <PatientBioCardShell
            title={title}
            className={className}
            isLoading={isLoading || !patient}
            badge={
                <PatientStatusBadge active={!!patient?.status}>
                    {patient?.status ? t("detail.status.active") : t("detail.status.inactive")}
                </PatientStatusBadge>
            }
        >
            {patient && (
                <>
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
                                <span
                                    className={cn(
                                        "font-mono font-bold",
                                        !isNikValidWithBirthDate
                                            ? "text-destructive"
                                            : "text-primary"
                                    )}
                                >
                                    {patient.identity_card?.identity_number || "-"}
                                </span>
                                {patient.identity_card?.identity_number && (
                                    <CopyButton text={patient.identity_card.identity_number} />
                                )}
                                {!isNikValidWithBirthDate && (
                                    <UnmatchBadge label={t("unmatch.nikBirthDateFormat")} />
                                )}
                            </span>
                        </div>
                    </div>

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

                        <div>
                            <p className="text-[10px] font-medium text-muted-foreground/70 uppercase">
                                {t("detail.bio.birthDate")}
                            </p>
                            <div className="mt-0.5 flex items-center gap-1.5">
                                <p
                                    className={cn(
                                        "truncate font-medium",
                                        !isNikValidWithBirthDate
                                            ? "font-bold text-destructive"
                                            : "text-foreground"
                                    )}
                                >
                                    {patient.birth_date ? formatDate(patient.birth_date) : "-"}
                                </p>
                            </div>
                        </div>

                        <Field
                            label={t("detail.bio.maritalStatus")}
                            value={patient.marital_status}
                        />
                        <Field label={t("detail.bio.citizenship")} value={patient.citizenship} />
                    </div>

                    <div className="border-t border-border/40 pt-1.5">
                        <div className="mt-5 mb-3 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground/80">
                            <span>{t("detail.ktp.sectionTitle")}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                            <Field
                                label={t("detail.ktp.address")}
                                value={patient.identity_card?.address}
                                wide
                            />
                            <Field label={t("detail.ktp.rt")} value={patient.identity_card?.rt} />
                            <Field label={t("detail.ktp.rw")} value={patient.identity_card?.rw} />
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
        </PatientBioCardShell>
    );
}
