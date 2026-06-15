import { PageLayout } from "@/components/layout/PageLayout";
import { ROUTES } from "@/constants";
import { PERMISSIONS } from "@/constants/permissions";
import { useCurrentUser, useHasPermission, useIsAdmin } from "@/hooks/use-current-user";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router";
import { EditTicketForm } from "../components/EditTicketForm";
import { getTicketQueryOption } from "../queries/ticket.query";

export function EditTicketPage() {
    const { t } = useTranslation("ticket");
    const { id } = useParams();
    const ticketId = Number(id);
    const currentUser = useCurrentUser();
    const canUpdatePermission = useHasPermission(PERMISSIONS.TICKET.UPDATE);

    const { data: ticketData } = useSuspenseQuery(getTicketQueryOption(ticketId));
    const ticket = ticketData.data;

    const isAdmin = useIsAdmin();
    const isOwner = currentUser?.id === ticket.created_by?.id;
    const canEdit = ticket.status === "OPEN" && canUpdatePermission && (isOwner || isAdmin);

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
