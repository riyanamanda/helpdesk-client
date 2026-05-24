import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigation } from "react-router";
import { useTopLoader } from "./useTopLoader";

export function useTopLoaderSync() {
    const navigation = useNavigation();
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    const loader = useTopLoader();

    useEffect(() => {
        const active = navigation.state !== "idle" || isFetching > 0 || isMutating > 0;

        if (active) {
            loader.start();
        } else {
            loader.complete();
        }
    }, [navigation.state, isFetching, isMutating, loader]);
}
