import { PageLayout } from "@/components/layout/PageLayout";
import { CreateTicketForm } from "../components/CreateTicketForm";

export function CreateTicketPage() {
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
