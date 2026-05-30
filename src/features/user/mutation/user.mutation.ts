import { useMutation } from "@tanstack/react-query";
import { userService } from "../service/userService";
import type { UpdateUserFormData, UserFormData } from "../types";

export function useCreateUserMutation() {
    return useMutation({
        mutationFn: (payload: UserFormData) => userService.create(payload),
    });
}

export function useUpdateUserMutation() {
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateUserFormData }) =>
            userService.update(id, payload),
    });
}

export function useUpdateUserPasswordMutation() {
    return useMutation({
        mutationFn: ({ id, password }: { id: string; password: string }) =>
            userService.updatePassword(id, password),
    });
}
