import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { NavLink } from "react-router";
import { getDivisionColumns } from "../config/divisionColumn";
import { listDivisionQueryOption } from "../queries/division.query";

export function DivisionPage() {
    const { data: divisionData, isLoading } = useQuery(listDivisionQueryOption());
    const divisions = divisionData?.data;

    const columns = getDivisionColumns(0);

    if (isLoading) {
        return <PageLayout>Loading...</PageLayout>;
    }

    return (
        <PageLayout>
            <PageHeader
                title="Division"
                description="All listed provided divisions"
                actions={
                    <NavLink to={ROUTES.DIVISION.CREATE}>
                        <Button variant="outline" className="cursor-pointer">
                            <PlusIcon />
                            Create new division
                        </Button>
                    </NavLink>
                }
            />

            <DataTable columns={columns} data={divisions} />
        </PageLayout>
    );
}
