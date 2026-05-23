import { ComponentLoading } from "@/components/ComponentLoading";
import { COOKIES, ROUTES } from "@/constants";
import { meQueryOption } from "@/features/auth/queries/auth.query";
import { cookies } from "@/lib/cookies";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router";

export function GuestRoutes() {
    const token = cookies.get(COOKIES.TOKEN_KEY);

    const { data: currentUser, isPending } = useQuery({
        ...meQueryOption(),
        enabled: !!token,
    });

    if (isPending && token) {
        return <ComponentLoading text="Authenticating your session..." />;
    }

    if (currentUser) {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    return <Outlet />;
}
