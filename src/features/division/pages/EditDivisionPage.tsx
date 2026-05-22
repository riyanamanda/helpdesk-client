import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { EditDivisionForm } from "../components/EditDivisionForm";
import { getDivisionQueryOption } from "../queries/division.query";

export function EditDivisionPage() {
    const { id } = useParams();
    const divisionId = Number(id);
    const { data: divisionData, isLoading } = useQuery(getDivisionQueryOption(divisionId));
    const division = divisionData?.data;

    return (
        <PageLayout>
            <PageHeader title="Edit Division" description="Edit a division information" />
            <div>
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <Spinner />
                    </div>
                ) : division ? (
                    <EditDivisionForm id={divisionId} division={division} />
                ) : null}
            </div>
        </PageLayout>
    );
}
