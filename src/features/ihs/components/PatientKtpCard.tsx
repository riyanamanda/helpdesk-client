import { Card, CardContent } from "@/components/ui/card";
import { IdCardIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PatientDetail } from "../types";
import { Field, FieldSkeleton } from "./Field";

interface Props {
    patient: PatientDetail;
    isLoading: boolean;
}

export function PatientKtpCard({ patient, isLoading }: Props) {
    const { t } = useTranslation("ihs");

    return (
        <Card className="overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border/50 bg-muted/20 px-4 py-2">
                <IdCardIcon className="h-3.5 w-3.5 text-muted-foreground/60" />
                <span className="text-[11px] font-semibold tracking-widest text-muted-foreground/60 uppercase">
                    {t("detail.ktp.title")}
                </span>
            </div>
            <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {isLoading ? (
                        <>
                            <FieldSkeleton wide />
                            <FieldSkeleton />
                            <FieldSkeleton />
                            <FieldSkeleton />
                            <FieldSkeleton />
                            <FieldSkeleton />
                            <FieldSkeleton />
                        </>
                    ) : (
                        <>
                            <Field
                                label={t("detail.ktp.address")}
                                value={patient.identity_card?.address}
                                wide
                            />
                            <Field label={t("detail.ktp.rt")} value={patient.identity_card?.rt} />
                            <Field label={t("detail.ktp.rw")} value={patient.identity_card?.rw} />
                            <Field
                                label={t("detail.ktp.province")}
                                value={patient.identity_card?.province}
                            />
                            <Field
                                label={t("detail.ktp.city")}
                                value={patient.identity_card?.city}
                            />
                            <Field
                                label={t("detail.ktp.district")}
                                value={patient.identity_card?.district}
                            />
                            <Field
                                label={t("detail.ktp.village")}
                                value={patient.identity_card?.sub_district}
                            />
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
