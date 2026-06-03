import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { ChevronLeftIcon } from "lucide-react";
import { NavLink } from "react-router";
import { UpdatePasswordCard } from "../components/UpdatePasswordCard";

export function UpdatePasswordPage() {
    return (
        <PageLayout>
            <PageLayout.Header
                title="Change Password"
                description="Update your account password"
                actions={
                    <NavLink to={ROUTES.PROFILE}>
                        <Button variant="outline">
                            <ChevronLeftIcon />
                            Back to Profile
                        </Button>
                    </NavLink>
                }
            />
            <PageLayout.Content>
                <div className="mx-auto max-w-2xl">
                    <UpdatePasswordCard />
                </div>
            </PageLayout.Content>
        </PageLayout>
    );
}
