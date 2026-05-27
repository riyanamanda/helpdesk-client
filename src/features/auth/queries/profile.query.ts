import { queryOptions } from "@tanstack/react-query";
import { profileService } from "../service/profileService";
import { PROFILE_QUERY_KEYS } from "./queryKeys";

export function profileQueryOption() {
    return queryOptions({
        queryKey: PROFILE_QUERY_KEYS.ME,
        queryFn: () => profileService.getProfile(),
    });
}
