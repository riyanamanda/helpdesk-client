import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react";

export function PatientValidationLegend() {
    return (
        <Card className="border-border/60 bg-muted/30 shadow-none">
            <CardHeader className="p-3.5 pb-2">
                <CardTitle className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <InfoIcon className="h-4 w-4 text-primary" />
                    <span>Petunjuk & Legend Validasi Data Pasien</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-3.5 pt-0">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    <Card className="border-border/40 bg-background/60 p-2.5 shadow-2xs">
                        <div className="flex items-start gap-2 text-xs">
                            <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                            <div className="space-y-0.5">
                                <p className="font-semibold text-foreground">
                                    Format NIK vs Tanggal Lahir
                                </p>
                                <p className="text-[11px] leading-snug text-muted-foreground">
                                    Memeriksa kesesuaian digit tanggal lahir pada NIK terhadap
                                    Tanggal Lahir terdaftar.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-border/40 bg-background/60 p-2.5 shadow-2xs">
                        <div className="flex items-start gap-2 text-xs">
                            <Badge
                                variant="outline"
                                className="mt-0.5 h-4 shrink-0 border-destructive/40 bg-destructive/10 px-1 text-[9px] font-semibold text-destructive"
                            >
                                Unmatch
                            </Badge>
                            <div className="space-y-0.5">
                                <p className="font-semibold text-foreground">
                                    Komparasi SIMGOS vs BPJS
                                </p>
                                <p className="text-[11px] leading-snug text-muted-foreground">
                                    Menandai perbedaan Nama, NIK, atau Tanggal Lahir antara SIMGOS
                                    dan BPJS VClaim.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-border/40 bg-background/60 p-2.5 shadow-2xs">
                        <div className="flex items-start gap-2 text-xs">
                            <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                            <div className="space-y-0.5">
                                <p className="font-semibold text-foreground">Indikator Mismatch</p>
                                <p className="text-[11px] leading-snug text-muted-foreground">
                                    Teks berwarna{" "}
                                    <span className="font-bold text-destructive">Merah</span>{" "}
                                    menandakan adanya ketidaksesuaian data.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}
