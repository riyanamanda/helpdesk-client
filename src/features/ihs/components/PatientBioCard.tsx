import { Card, CardContent } from "@/components/ui/card";
import { UserRoundIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PatientDetail } from "../types";
import { Field, FieldSkeleton } from "./Field";

interface Props {
    patient: PatientDetail;
    isLoading: boolean;
}

export function PatientBioCard({ patient, isLoading }: Props) {
    const { t } = useTranslation("ihs");

    return (
        <Card className="overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border/50 bg-muted/20 px-6 py-3">
                <UserRoundIcon className="h-3.5 w-3.5 text-muted-foreground/60" />
                <span className="text-[11px] font-semibold tracking-widest text-muted-foreground/60 uppercase">
                    {t("detail.bio.title")}
                </span>
            </div>
            <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                    {isLoading ? (
                        <>
                            <FieldSkeleton wide />
                            <FieldSkeleton />
                            <FieldSkeleton />
                            <FieldSkeleton />
                            <FieldSkeleton />
                            <FieldSkeleton />
                        </>
                    ) : (
                        <>
                            <Field label={t("detail.bio.name")} value={patient.name} wide />
                            <Field label={t("detail.bio.birthPlace")} value={patient.birth_place} />
                            <Field label={t("detail.bio.birthDate")} value={patient.birth_date} />
                            <Field
                                label={t("detail.bio.maritalStatus")}
                                value={patient.marital_status}
                            />
                            <Field
                                label={t("detail.bio.citizenship")}
                                value={patient.citizenship}
                            />
                            <Field label={t("detail.bio.status")} value={patient.status} wide />
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
