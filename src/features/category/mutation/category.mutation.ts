import { useMutation } from "@tanstack/react-query";
import { categoryService } from "../service/categoryService";
import type { CategoryFormData } from "../types";

export function useCreateCategoryMutation() {
    return useMutation({
        mutationFn: (payload: Pick<CategoryFormData, "name">) => categoryService.create(payload),
    });
}

export function useUpdateCategoryMutation() {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: CategoryFormData }) =>
            categoryService.update(id, payload),
    });
}

export function useDeleteCategoryMutation() {
    return useMutation({
        mutationFn: (id: number) => categoryService.delete(id),
    });
}
