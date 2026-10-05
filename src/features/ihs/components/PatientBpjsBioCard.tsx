import { CopyButton } from "@/components/CopyButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { AlertTriangleIcon, UserRoundIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { isDateMatch, isNikMatchBirthDate, isTextMatch } from "../helper";
import type { PatientBpjs, PatientDetail } from "../types";
import { Field, FieldSkeleton } from "./Field";

interface Props {
    title: string;
    className?: string;
    patient?: PatientBpjs;
    simgosPatient?: PatientDetail;
    isLoading: boolean;
}

function UnmatchBadge({ label }: { label?: string }) {
    return (
        <Badge
            variant="outline"
            className="inline-flex h-4 shrink-0 items-center gap-1 border-destructive/40 bg-destructive/10 px-1.5 text-[9px] font-semibold text-destructive dark:bg-destructive/20"
        >
            <AlertTriangleIcon className="h-2.5 w-2.5 text-destructive" />
            {label || "Unmatch"}
        </Badge>
    );
}

export function PatientBpjsBioCard({ title, className, patient, simgosPatient, isLoading }: Props) {
    const { t } = useTranslation("ihs");

    const isActive =
        patient?.status_peserta?.kode === "0" ||
        patient?.status_peserta?.keterangan?.toLowerCase().includes("aktif");

    const isNamaMatch = isTextMatch(simgosPatient?.name, patient?.nama);
    const isNikMatch = isTextMatch(simgosPatient?.identity_card?.identity_number, patient?.nik);
    const isBirthDateMatch = isDateMatch(simgosPatient?.birth_date, patient?.tgl_lahir);
    const isNikValidWithBirthDate = isNikMatchBirthDate(patient?.nik, patient?.tgl_lahir);

    return (
        <Card
            className={cn(
                "flex h-fit flex-col overflow-hidden border border-border/60 shadow-2xs",
                className
            )}
        >
            <div className="flex items-center justify-between border-b border-border/50 bg-muted/40 px-3.5 py-1.5">
                <div className="flex items-center gap-1.5">
                    <UserRoundIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
                    <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                        {title}
                    </span>
                </div>
                {patient && !isLoading && (
                    <Badge
                        variant={isActive ? "success" : "destructive"}
                        className="h-4 px-1.5 text-[9px]"
                    >
                        {patient?.status_peserta?.keterangan ||
                            (isActive ? t("detail.status.active") : t("detail.status.inactive"))}
                    </Badge>
                )}
            </div>

            <CardContent className="flex-1 space-y-3 p-3.5 text-xs">
                {isLoading ? (
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
                ) : !patient ? (
                    <div className="py-8 text-center text-muted-foreground">
                        Data peserta BPJS tidak ditemukan / NIK tidak terdaftar.
                    </div>
                ) : (
                    <>
                        <div className="space-y-1.5 border-b border-border/40 pb-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3
                                    className={cn(
                                        "truncate text-sm font-semibold tracking-tight",
                                        !isNamaMatch
                                            ? "font-bold text-destructive"
                                            : "text-foreground"
                                    )}
                                >
                                    {patient?.nama || "-"}
                                </h3>
                                {!isNamaMatch && <UnmatchBadge label="Beda Nama" />}
                            </div>

                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <span className="font-medium text-foreground/50">NORM</span>
                                    <span className="font-mono font-bold text-primary">
                                        {patient?.mr?.no_mr || "-"}
                                    </span>
                                    {patient?.mr?.no_mr && <CopyButton text={patient.mr.no_mr} />}
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
                                        {patient?.nik || "-"}
                                    </span>
                                    {patient?.nik && <CopyButton text={patient.nik} />}
                                    {!isNikMatch && <UnmatchBadge label="Beda NIK" />}
                                    {!isNikValidWithBirthDate && (
                                        <UnmatchBadge label="NIK & Tgl Lahir Beda" />
                                    )}
                                </span>

                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <span className="font-medium text-foreground/50">No. BPJS</span>
                                    <span className="font-mono font-bold text-primary">
                                        {patient?.no_kartu || "-"}
                                    </span>
                                    {patient?.no_kartu && <CopyButton text={patient.no_kartu} />}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                            <div>
                                <p className="text-[10px] font-medium text-muted-foreground/70 uppercase">
                                    Jenis Kelamin
                                </p>
                                <p className="truncate font-medium text-foreground">
                                    {patient?.sex === "L"
                                        ? "Laki-laki"
                                        : patient?.sex === "P"
                                          ? "Perempuan"
                                          : "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-medium text-muted-foreground/70 uppercase">
                                    {t("detail.bio.birthDate", "Tanggal Lahir")}
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
                                        {patient?.tgl_lahir ? formatDate(patient.tgl_lahir) : "-"}
                                    </p>
                                    {!isBirthDateMatch && <UnmatchBadge label="Beda Tgl Lahir" />}
                                </div>
                            </div>

                            <Field
                                label="Umur Saat Pelayanan"
                                value={patient?.umur?.umur_saat_pelayanan || "-"}
                            />

                            <Field
                                label="Hak Kelas"
                                value={patient?.hak_kelas?.keterangan || "-"}
                            />

                            <Field
                                label="Jenis Peserta"
                                value={patient?.jenis_peserta?.keterangan || "-"}
                            />

                            <Field
                                label="Faskes Utama (FKTP)"
                                value={patient?.prov_umum?.nm_provider || "-"}
                            />

                            <Field
                                label="No. Medical Record (MR)"
                                value={patient?.mr?.no_mr || "-"}
                            />

                            <Field label="No. Telepon" value={patient?.mr?.no_telepon || "-"} />

                            <Field
                                label="TMT (Terhitung Mulai)"
                                value={patient?.tgl_tmt ? formatDate(patient.tgl_tmt) : "-"}
                            />

                            <Field
                                label="TAT (Terhitung Akhir)"
                                value={patient?.tgl_tat ? formatDate(patient.tgl_tat) : "-"}
                            />
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
