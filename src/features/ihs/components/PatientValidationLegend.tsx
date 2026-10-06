import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

export function PatientValidationLegend() {
    const { t } = useTranslation("ihs");

    return (
        <Card className="border-border/60 bg-muted/30 shadow-none">
            <CardHeader className="p-3.5 pb-2">
                <CardTitle className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <InfoIcon className="h-4 w-4 text-primary" />
                    <span>{t("legend.title")}</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-3.5 pt-0">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    <Card className="border-border/40 bg-background/60 p-2.5 shadow-2xs">
                        <div className="flex items-start gap-2 text-xs">
                            <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                            <div className="space-y-0.5">
                                <p className="font-semibold text-foreground">
                                    {t("legend.nikFormat.title")}
                                </p>
                                <p className="text-[11px] leading-snug text-muted-foreground">
                                    {t("legend.nikFormat.description")}
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
                                {t("unmatch.default")}
                            </Badge>
                            <div className="space-y-0.5">
                                <p className="font-semibold text-foreground">
                                    {t("legend.comparison.title")}
                                </p>
                                <p className="text-[11px] leading-snug text-muted-foreground">
                                    {t("legend.comparison.description")}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-border/40 bg-background/60 p-2.5 shadow-2xs">
                        <div className="flex items-start gap-2 text-xs">
                            <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                            <div className="space-y-0.5">
                                <p className="font-semibold text-foreground">
                                    {t("legend.mismatch.title")}
                                </p>
                                <p className="text-[11px] leading-snug text-muted-foreground">
                                    <Trans
                                        i18nKey="ihs:legend.mismatch.description"
                                        components={{
                                            1: <span className="font-bold text-destructive" />,
                                        }}
                                    />
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}
