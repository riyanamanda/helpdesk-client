import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { NavLink } from "react-router";

export function HomePage() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                Welcome: IT Helpdesk
            </h1>
            <p className="mt-2 text-xs">The ticketing management system for internal users</p>

            <div className="mt-10 inline-flex gap-2">
                <NavLink to={ROUTES.DASHBOARD}>
                    <Button variant="secondary">Dashboard</Button>
                </NavLink>

                <NavLink to={ROUTES.LOGIN}>
                    <Button variant="ghost">Login</Button>
                </NavLink>
            </div>
        </div>
    );
}
