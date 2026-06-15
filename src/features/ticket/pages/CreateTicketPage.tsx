import { PageLayout } from "@/components/layout/PageLayout";
import { PERMISSIONS } from "@/constants/permissions";
import { ROUTES } from "@/constants";
import { useHasPermission } from "@/hooks/use-current-user";
import { Navigate } from "react-router";
import { CreateTicketForm } from "../components/CreateTicketForm";

export function CreateTicketPage() {
    const canCreate = useHasPermission(PERMISSIONS.TICKET.CREATE);

    if (!canCreate) {
        return <Navigate to={ROUTES.TICKET.INDEX} replace />;
    }

    return (
        <PageLayout>
            <PageLayout.Header
                title="Submit Ticket"
                description="Report a new issue to the helpdesk"
            />
            <PageLayout.Content>
                <CreateTicketForm />
            </PageLayout.Content>
        </PageLayout>
    );
}
