import { DataTable } from "@/components/DataTable";
import { PageLayout } from "@/components/layout/PageLayout";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getPatientColumns } from "../config/patientColumn";
import type { Patient } from "../types";

export function SatuSehatPage() {
    const { t } = useTranslation("satuSehat");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");
    const isLoading = false;

    const columns = getPatientColumns(t, (page - 1) * limit);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const data: Patient[] = [
        {
            name: "Testing",
            ktp: "167123799281273",
            http_method: "GET",
        },
        {
            name: "Testing 2",
            ktp: "167123799281273",
            http_method: "POST",
        },
    ];

    return (
        <PageLayout>
            <PageLayout.Header title={t("page.title")} description={t("page.description")} />
            <PageLayout.Content>
                <div className="flex flex-wrap items-center gap-2">
                    <Input
                        placeholder={t("page.searchPlaceholder")}
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="max-w-xs"
                    />
                </div>

                <DataTable columns={columns} data={data} isLoading={isLoading} />
            </PageLayout.Content>
        </PageLayout>
    );
}
