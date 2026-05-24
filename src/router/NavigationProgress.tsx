import { useTopLoaderSync } from "@/components/top-loader/useTopLoaderSync";
import { Outlet } from "react-router";

export function NavigationProgress() {
    useTopLoaderSync();
    return <Outlet />;
}
