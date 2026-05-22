import { useMutation } from "@tanstack/react-query";
import { divisionService } from "../service/divisionService";
import type { DivisionFormData } from "../types";

export function useCreateDivisionMutation() {
    return useMutation({
        mutationFn: (payload: Pick<DivisionFormData, "name">) => divisionService.create(payload),
    });
}

export function useUpdateDivisionMutation() {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: DivisionFormData }) =>
            divisionService.update(id, payload),
    });
}

export function useDeleteDivisionMutation() {
    return useMutation({
        mutationFn: (id: number) => divisionService.delete(id),
    });
}
