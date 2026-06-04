import { PageLayout } from "@/components/layout/PageLayout";
import { useTranslation } from "react-i18next";
import { CreateFeedbackForm } from "../components/CreateFeedbackForm";

export function CreateFeedbackPage() {
    const { t } = useTranslation("feedback");
    return (
        <PageLayout>
            <PageLayout.Header
                title={t("create.pageTitle")}
                description={t("create.pageDescription")}
            />
            <PageLayout.Content>
                <CreateFeedbackForm />
            </PageLayout.Content>
        </PageLayout>
    );
}
