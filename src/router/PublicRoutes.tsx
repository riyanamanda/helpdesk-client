import { Outlet } from "react-router";

export function PublicRoutes() {
    console.log("public route hit");

    return <Outlet />;
}
