import { ComponentLoading } from "@/components/ComponentLoading";
import { COOKIES, ROUTES, SESSION_STORAGE_KEYS } from "@/constants";
import { meQueryOption } from "@/features/auth/queries/auth.query";
import { cookies } from "@/lib/cookies";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Navigate, Outlet, useLocation, type Location } from "react-router";

export function ProtectedRoutes() {
    const location = useLocation();
    const token = cookies.get(COOKIES.TOKEN_KEY);

    const {
        data: currentUser,
        isPending,
        isError,
    } = useQuery({
        ...meQueryOption(),
        enabled: !!token,
    });

    if (!token) {
        return redirectIfUnauthorized(location);
    }

    if (isPending) {
        return <ComponentLoading text="Authenticating your session..." />;
    }

    if (isError || !currentUser) {
        return redirectIfUnauthorized(location);
    }

    return (
        <Suspense fallback={<ComponentLoading text="Loading..." />}>
            <Outlet />
        </Suspense>
    );
}

function redirectIfUnauthorized(location: Location) {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.REDIRECT_AFTER_LOGIN, location.pathname);
    return <Navigate to={ROUTES.LOGIN} replace />;
}
