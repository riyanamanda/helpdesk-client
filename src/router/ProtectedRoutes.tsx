import { Outlet } from "react-router";

export function ProtectedRoutes() {
    console.log("protected routes hit");

    return <Outlet />;
}
