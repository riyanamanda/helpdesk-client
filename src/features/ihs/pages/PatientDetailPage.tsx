import { PageLayout } from "@/components/layout/PageLayout";
import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import { handleApiError } from "@/lib/handle-form-error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EditIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { toast } from "sonner";
import { PatientBioCard } from "../components/PatientBioCard";
import { PatientHeader } from "../components/PatientHeader";
import { PatientKtpCard } from "../components/PatientKtpCard";
import { detailPatientQueryOptions } from "../queries/patient.query";
import { PATIENT_QUERY_KEYS } from "../queries/queryKeys";
import { patientService } from "../service/patientService";
import type { PatientDetail } from "../types";

const DUMMY_PATIENT: PatientDetail = {
    norm: "00123456",
    name: "Budi Santoso",
    nik: "3173012301900001",
    birth_place: "Jakarta",
    birth_date: "23 Januari 1990",
    marital_status: "Menikah",
    citizenship: "WNI",
    status: "Aktif",
    address: "Jl. Raya Kebon Jeruk No. 12",
    rt: "005",
    rw: "003",
    province: "DKI Jakarta",
    city: "Jakarta Barat",
    district: "Kebon Jeruk",
    village: "Kebon Jeruk",
};

export function DetailPatientPage() {
    const { norm } = useParams();
    const { t } = useTranslation("ihs");
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery(detailPatientQueryOptions(norm!));
    const patient = data ?? DUMMY_PATIENT;

    const { mutate: createIhs, isPending: isCreating } = useMutation({
        mutationFn: (value: string) => patientService.create(value),
    });

    const handleCreateIhs = () => {
        if (!norm) return;

        createIhs(norm, {
            onSuccess: async () => {
                toast.success(t("common:toast.success"), {
                    description: t("detail.createDialog.success"),
                });

                await queryClient.invalidateQueries({ queryKey: PATIENT_QUERY_KEYS.ROOT });
            },
            onError: (error) => handleApiError(error),
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
                <PatientHeader patient={patient} isLoading={isLoading} />

                <div className="grid gap-4 md:grid-cols-2">
                    <PatientBioCard patient={patient} isLoading={isLoading} />
                    <PatientKtpCard patient={patient} isLoading={isLoading} />
                </div>
            </PageLayout.Content>
        </PageLayout>
    );
}
