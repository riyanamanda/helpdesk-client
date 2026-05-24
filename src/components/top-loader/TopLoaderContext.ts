import { createContext } from "react";

export type TopLoaderContextType = {
    start: () => void;
    complete: () => void;
};

export const TopLoaderContext = createContext<TopLoaderContextType | null>(null);
