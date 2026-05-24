import { useCallback, useMemo, useRef } from "react";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";
import { TopLoaderContext } from "./TopLoaderContext";

export function TopLoaderProvider({ children }: { children: React.ReactNode }) {
    const ref = useRef<LoadingBarRef>(null);

    const start = useCallback(() => {
        ref.current?.continuousStart();
    }, []);

    const complete = useCallback(() => {
        ref.current?.complete();
    }, []);

    const value = useMemo(() => ({ start, complete }), [start, complete]);

    return (
        <TopLoaderContext.Provider value={value}>
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
