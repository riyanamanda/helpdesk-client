import { DeleteDialog } from "@/components/DeleteDialog";
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
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, EditIcon, ShieldAlertIcon, UserXIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { PatientBioCard } from "../components/PatientBioCard";
import { PatientHeader } from "../components/PatientHeader";
import { PatientKtpCard } from "../components/PatientKtpCard";
import { useCreateIhsMutation } from "../mutation/ihs.mutation";
import { detailPatientQueryOptions } from "../queries/patient.query";

export function DetailPatientPage() {
    const navigate = useNavigate();
    const { norm } = useParams();
    const { t } = useTranslation("ihs");

    const { data: patientData, isLoading, isError } = useQuery(detailPatientQueryOptions(norm!));
    const patient = patientData;

    const { mutate: createIhs, isPending: isCreating } = useCreateIhsMutation();

    const handleCreateIhs = () => {
        if (!norm) return;
        createIhs(norm, {
            onSuccess: () => navigate(ROUTES.IHS.INDEX, { replace: true }),
        });
    };

    return (
        <PageLayout>
            <PageLayout.Header
                title={t("detail.title")}
                description={t("detail.description")}
                actions={
                    <DeleteDialog
                        title={t("detail.createDialog.title")}
                        description={t("detail.createDialog.description")}
                        confirmLabel={t("detail.createDialog.confirm")}
                        pendingLabel={t("detail.createDialog.creating")}
                        icon={<EditIcon />}
                        isPending={isCreating}
                        onConfirm={handleCreateIhs}
                        trigger={
                            <Button variant="destructive" size="sm" disabled={isCreating}>
                                <EditIcon />
                                <span>{t("detail.createDialog.button")}</span>
                            </Button>
                        }
                    />
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
                    <>
                        <Alert className="border-amber-500/30 bg-amber-500/10">
                            <ShieldAlertIcon className="text-amber-500" />
                            <AlertTitle className="text-amber-500">
                                {t("detail.alert.title")}
                            </AlertTitle>
                            <AlertDescription>{t("detail.alert.description")}</AlertDescription>
                        </Alert>

                        <PatientHeader patient={patient} isLoading={isLoading} />

                        <div className="grid gap-3 md:grid-cols-2">
                            <PatientBioCard patient={patient!} isLoading={isLoading} />
                            <PatientKtpCard patient={patient!} isLoading={isLoading} />
                        </div>
                    </>
                )}
            </PageLayout.Content>
        </PageLayout>
    );
}
