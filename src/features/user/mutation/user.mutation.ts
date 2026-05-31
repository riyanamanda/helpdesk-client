import { useMutation } from "@tanstack/react-query";
import { userService } from "../service/userService";
import type { UserFormData } from "../types";

export function useCreateUserMutation() {
    return useMutation({
        mutationFn: (payload: UserFormData) => userService.create(payload),
    });
}

export function useUpdateUserMutation() {
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Omit<UserFormData, "password"> }) =>
            userService.update(id, payload),
    });
}

export function useUpdateUserPasswordMutation() {
    return useMutation({
        mutationFn: ({ id, password }: { id: string; password: string }) =>
            userService.updatePassword(id, password),
    });
}
