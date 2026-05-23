import { useMutation } from "@tanstack/react-query";
import { userService } from "../service/userService";
import type { UserFormData } from "../types";

export function useCreateUserMutation() {
    return useMutation({
        mutationFn: (payload: UserFormData) => userService.create(payload),
    });
}
