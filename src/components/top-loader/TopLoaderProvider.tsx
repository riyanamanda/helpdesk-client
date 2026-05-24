import { useRef } from "react";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";
import { TopLoaderContext } from "./TopLoaderContext";

export function TopLoaderProvider({ children }: { children: React.ReactNode }) {
    const ref = useRef<LoadingBarRef>(null);

    const start = () => {
        ref.current?.continuousStart();
    };

    const complete = () => {
        ref.current?.complete();
    };

    return (
        <TopLoaderContext.Provider
            value={{
                start,
                complete,
            }}
        >
            <LoadingBar
                color="var(--primary)"
                height={2}
                shadow
                waitingTime={300}
                loaderSpeed={500}
                transitionTime={300}
                ref={ref}
            />

            {children}
        </TopLoaderContext.Provider>
    );
}
