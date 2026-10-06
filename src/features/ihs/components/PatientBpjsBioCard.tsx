import { CopyButton } from "@/components/CopyButton";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { isDateMatch, isNikMatchBirthDate, isTextMatch } from "../helper";
import type { PatientBpjs, PatientDetail } from "../types";
import { Field } from "./Field";
import { PatientBioCardShell, PatientStatusBadge } from "./PatientBioCardShell";
import { UnmatchBadge } from "./UnmatchBadge";

interface Props {
    title: string;
    className?: string;
    patient?: PatientBpjs;
    simgosPatient?: PatientDetail;
    isLoading: boolean;
}

export function PatientBpjsBioCard({ title, className, patient, simgosPatient, isLoading }: Props) {
    const { t } = useTranslation("ihs");

    const isActive =
        patient?.status_peserta?.kode === "0" ||
        !!patient?.status_peserta?.keterangan?.toLowerCase().includes("aktif");

    const isNamaMatch = isTextMatch(simgosPatient?.name, patient?.nama);
    const isNikMatch = isTextMatch(simgosPatient?.identity_card?.identity_number, patient?.nik);
    const isBirthDateMatch = isDateMatch(simgosPatient?.birth_date, patient?.tgl_lahir);
    const isNikValidWithBirthDate = isNikMatchBirthDate(patient?.nik, patient?.tgl_lahir);

    return (
        <PatientBioCardShell
            title={title}
            className={className}
            isLoading={isLoading}
            badge={
                patient && (
                    <PatientStatusBadge active={isActive}>
                        {patient.status_peserta?.keterangan ||
                            (isActive ? t("detail.status.active") : t("detail.status.inactive"))}
                    </PatientStatusBadge>
                )
            }
        >
            {!patient ? (
                <div className="py-8 text-center text-muted-foreground">
                    <p className="font-medium text-foreground/80">{t("bpjs.notFound.title")}</p>
                    <p className="mt-1 text-[11px]">{t("bpjs.notFound.description")}</p>
                </div>
            ) : (
                <>
                    <div className="space-y-1.5 border-b border-border/40 pb-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3
                                className={cn(
                                    "truncate text-sm font-semibold tracking-tight",
                                    !isNamaMatch ? "font-bold text-destructive" : "text-foreground"
                                )}
                            >
                                {patient.nama || "-"}
                            </h3>
                            {!isNamaMatch && <UnmatchBadge label={t("unmatch.name")} />}
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                            <span className="flex items-center gap-1 text-muted-foreground">
                                <span className="font-medium text-foreground/50">NORM</span>
                                <span className="font-mono font-bold text-primary">
                                    {patient.mr?.no_mr || "-"}
                                </span>
                                {patient.mr?.no_mr && <CopyButton text={patient.mr.no_mr} />}
                            </span>

                            <span className="flex items-center gap-1 text-muted-foreground">
                                <span className="font-medium text-foreground/50">NIK</span>
                                <span
                                    className={cn(
                                        "font-mono font-bold",
                                        !isNikMatch || !isNikValidWithBirthDate
                                            ? "text-destructive"
                                            : "text-primary"
                                    )}
                                >
                                    {patient.nik || "-"}
                                </span>
                                {patient.nik && <CopyButton text={patient.nik} />}
                                {!isNikMatch && <UnmatchBadge label={t("unmatch.nik")} />}
                                {!isNikValidWithBirthDate && (
                                    <UnmatchBadge label={t("unmatch.nikBirthDate")} />
                                )}
                            </span>

                            <span className="flex items-center gap-1 text-muted-foreground">
                                <span className="font-medium text-foreground/50">No. BPJS</span>
                                <span className="font-mono font-bold text-primary">
                                    {patient.no_kartu || "-"}
                                </span>
                                {patient.no_kartu && <CopyButton text={patient.no_kartu} />}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                        <div>
                            <p className="text-[10px] font-medium text-muted-foreground/70 uppercase">
                                {t("bpjs.sex")}
                            </p>
                            <p className="truncate font-medium text-foreground">
                                {patient.sex === "L"
                                    ? t("common:gender.male")
                                    : patient.sex === "P"
                                      ? t("common:gender.female")
                                      : "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-medium text-muted-foreground/70 uppercase">
                                {t("detail.bio.birthDate")}
                            </p>
                            <div className="mt-0.5 flex items-center gap-1.5">
                                <p
                                    className={cn(
                                        "truncate font-medium",
                                        !isBirthDateMatch || !isNikValidWithBirthDate
                                            ? "font-bold text-destructive"
                                            : "text-foreground"
                                    )}
                                >
                                    {patient.tgl_lahir ? formatDate(patient.tgl_lahir) : "-"}
                                </p>
                                {!isBirthDateMatch && (
                                    <UnmatchBadge label={t("unmatch.birthDate")} />
                                )}
                            </div>
                        </div>

                        <Field
                            label={t("bpjs.ageAtService")}
                            value={patient.umur?.umur_saat_pelayanan || "-"}
                        />

                        <Field
                            label={t("bpjs.class")}
                            value={patient.hak_kelas?.keterangan || "-"}
                        />

                        <Field
                            label={t("bpjs.participantType")}
                            value={patient.jenis_peserta?.keterangan || "-"}
                        />

                        <Field
                            label={t("bpjs.faskes")}
                            value={patient.prov_umum?.nm_provider || "-"}
                        />

                        <Field
                            label={t("bpjs.tmt")}
                            value={patient.tgl_tmt ? formatDate(patient.tgl_tmt) : "-"}
                        />

                        <Field
                            label={t("bpjs.tat")}
                            value={patient.tgl_tat ? formatDate(patient.tgl_tat) : "-"}
                        />
                    </div>
                </>
            )}
        </PatientBioCardShell>
    );
}
