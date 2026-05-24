import { useContext } from "react";

import { TopLoaderContext } from "./TopLoaderContext";

export function useTopLoader() {
    const context = useContext(TopLoaderContext);

    if (!context) {
        throw new Error("useTopLoader must be used within TopLoaderProvider");
    }

    return context;
}
