import { ErbaImg } from "@/assets/images";
import { CONFIG, ROUTES } from "@/constants";
import { NavLink } from "react-router";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <NavLink to={ROUTES.HOME} className="flex items-center gap-2 font-medium">
                        <img
                            src="/favicon.svg"
                            className="flex size-6 items-center justify-center rounded-md"
                        />
                        {CONFIG.APP_NAME}
                    </NavLink>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src={ErbaImg}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
