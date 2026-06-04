import { COOKIES, ROUTES } from "@/constants";
import { meQueryOption } from "@/features/auth/queries/auth.query";
import { cookies } from "@/lib/cookies";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router";

export function AdminRoute() {
    const token = cookies.get(COOKIES.TOKEN_KEY);
    const { data, isPending } = useQuery({ ...meQueryOption(), enabled: !!token });
    const user = data?.data;

    if (isPending) return null;

    if (!user || user.role !== "ADMIN") {
        return <Navigate to={ROUTES.TICKET.INDEX} replace />;
    }

    return <Outlet />;
}
