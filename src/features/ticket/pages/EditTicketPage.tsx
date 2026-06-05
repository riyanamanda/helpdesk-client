import { PageLayout } from "@/components/layout/PageLayout";
import { ROUTES } from "@/constants";
import { meQueryOption } from "@/features/auth/queries/auth.query";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router";
import { EditTicketForm } from "../components/EditTicketForm";
import { getTicketQueryOption } from "../queries/ticket.query";

export function EditTicketPage() {
    const { t } = useTranslation("ticket");
    const { id } = useParams();
    const ticketId = Number(id);
    const { data: currentUserData, isLoading: isUserLoading } = useQuery(meQueryOption());

    const { data: ticketData } = useSuspenseQuery(getTicketQueryOption(ticketId));
    const ticket = ticketData.data;

    if (isUserLoading) {
        return null;
    }

    const currentUser = currentUserData?.data;
    const canEdit = currentUser?.id === ticket.created_by?.id && ticket.status === "OPEN";

    if (!canEdit) {
        return <Navigate to={ROUTES.TICKET.DETAIL.replace(":id", String(ticketId))} replace />;
    }

    return (
        <PageLayout>
            <PageLayout.Header
                title={t("edit.cardTitle")}
                description={t("edit.pageDescription")}
            />
            <PageLayout.Content>
                <EditTicketForm id={ticketId} ticket={ticket} />
            </PageLayout.Content>
        </PageLayout>
    );
}
