import { ConfirmDialog } from "@/components/ConfirmDialog";
import { PageLayout } from "@/components/layout/PageLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { ROUTES } from "@/constants";
import { PERMISSIONS } from "@/constants/permissions";
import { useHasPermission } from "@/hooks/use-current-user";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, EditIcon, ShieldAlertIcon, UserXIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { PatientBioCard } from "../components/PatientBioCard";
import { PatientBpjsBioCard } from "../components/PatientBpjsBioCard";
import { PatientValidationLegend } from "../components/PatientValidationLegend";
import { useCreateIhsMutation } from "../mutation/ihs.mutation";
import { detailBPJSPatientQueryOptions, detailPatientQueryOptions } from "../queries/patient.query";

export function DetailPatientPage() {
    const navigate = useNavigate();
    const { norm } = useParams();
    const { t } = useTranslation("ihs");

    const {
        data: patient,
        isLoading: isPatientLoading,
        isError,
    } = useQuery(detailPatientQueryOptions(norm!));

    const identityNumber = patient?.identity_card?.identity_number;

    const { data: patientBpjs, isLoading: isBpjsLoading } = useQuery({
        ...detailBPJSPatientQueryOptions(identityNumber ?? ""),
        enabled: !!identityNumber,
    });

    const { mutate: createIhs, isPending: isCreating } = useCreateIhsMutation();
    const hasPermission = useHasPermission(PERMISSIONS.IHS.UPDATE);

    const isDataLoading = isPatientLoading || (!!identityNumber && isBpjsLoading);

    const hasIncompleteData =
        !isPatientLoading &&
        !!patient &&
        (!patient.name ||
            !patient.birth_date ||
            !patient.birth_place ||
            !patient.identity_card?.identity_number ||
            !patient.identity_card?.address);

    const handleCreateIhs = () => {
        if (!norm) return;
        createIhs(norm, {
            onSuccess: async () => {
                toast.success(t("common:toast.success"), {
                    description: t("detail.createDialog.success"),
                });
                navigate(ROUTES.IHS.INDEX, { replace: true });
            },
        });
    };

    return (
        <PageLayout>
            <PageLayout.Header
                title={t("detail.title")}
                description={t("detail.description")}
                actions={
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                            <ArrowLeftIcon />
                            {t("common:back")}
                        </Button>
                        {hasPermission && (
                            <ConfirmDialog
                                title={t("detail.createDialog.title")}
                                description={t("detail.createDialog.description")}
                                confirmLabel={t("detail.createDialog.confirm")}
                                pendingLabel={t("detail.createDialog.creating")}
                                icon={<EditIcon />}
                                variant="default"
                                isPending={isCreating}
                                onConfirm={handleCreateIhs}
                                trigger={
                                    <Button
                                        size="sm"
                                        disabled={isCreating || hasIncompleteData || isDataLoading}
                                    >
                                        <EditIcon />
                                        <span>{t("detail.createDialog.button")}</span>
                                    </Button>
                                }
                            />
                        )}
                    </div>
                }
            />

            <PageLayout.Content>
                {isError ? (
                    <Empty className="border border-dashed py-16">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <UserXIcon className="text-destructive" />
                            </EmptyMedia>
                            <EmptyTitle>{t("detail.notFound.title")}</EmptyTitle>
                            <EmptyDescription>{t("detail.notFound.description")}</EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
                                <ArrowLeftIcon />
                                {t("common:back")}
                            </Button>
                        </EmptyContent>
                    </Empty>
                ) : (
                    <div className="space-y-4">
                        <Alert className="border-amber-500/30 bg-amber-500/10">
                            <ShieldAlertIcon className="h-4 w-4 text-amber-500" />
                            <AlertTitle className="font-semibold text-amber-600 dark:text-amber-400">
                                {t("detail.alert.title")}
                            </AlertTitle>
                            <AlertDescription className="text-amber-700 dark:text-amber-300">
                                {t("detail.alert.description")}
                            </AlertDescription>
                        </Alert>

                        <PatientValidationLegend />

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <PatientBioCard
                                title="SIMGOS"
                                className="bg-primary/5"
                                patient={patient}
                                isLoading={isPatientLoading}
                            />

                            <PatientBpjsBioCard
                                title="BPJS"
                                className="bg-blue-500/5"
                                patient={patientBpjs}
                                simgosPatient={patient}
                                isLoading={isBpjsLoading || (isPatientLoading && !patientBpjs)}
                            />
                        </div>
                    </div>
                )}
            </PageLayout.Content>
        </PageLayout>
    );
}
