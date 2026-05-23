import { DataTable } from "@/components/DataTable";
import { DataTablePagination } from "@/components/DataTablePagination";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { getTicketColumns } from "../config/ticketColumn";
import { listTicketQueryOption } from "../queries/ticket.query";

export function TicketPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data, isLoading } = useQuery({
        ...listTicketQueryOption({ page, limit }),
        placeholderData: keepPreviousData,
    });

    const tickets = data?.data;
    const pagination = data?.meta.pagination;
    const columns = getTicketColumns((page - 1) * limit);

    return (
        <PageLayout>
            <PageLayout.Header
                title="Tickets"
                description="All active helpdesk tickets"
                actions={
                    <NavLink to={ROUTES.TICKET.CREATE}>
                        <Button variant="outline" className="cursor-pointer">
                            <PlusIcon />
                            Submit ticket
                        </Button>
                    </NavLink>
                }
            />
            <PageLayout.Content>
                <DataTable columns={columns} data={tickets} isLoading={isLoading} />

                {pagination && (
                    <DataTablePagination
                        pagination={pagination}
                        onPageChange={setPage}
                        onLimitChange={setLimit}
                    />
                )}
            </PageLayout.Content>
        </PageLayout>
    );
}
