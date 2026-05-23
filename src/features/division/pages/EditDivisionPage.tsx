import { PageLayout } from "@/components/layout/PageLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { EditDivisionForm } from "../components/EditDivisionForm";
import { getDivisionQueryOption } from "../queries/division.query";

export function EditDivisionPage() {
    const { id } = useParams();
    const divisionId = Number(id);
    const { data: divisionData } = useSuspenseQuery(getDivisionQueryOption(divisionId));
    const division = divisionData.data;

    return (
        <PageLayout>
            <PageLayout.Header title="Edit Division" description="Edit a division information" />
            <PageLayout.Content>
                <EditDivisionForm id={divisionId} division={division} />
            </PageLayout.Content>
        </PageLayout>
    );
}
