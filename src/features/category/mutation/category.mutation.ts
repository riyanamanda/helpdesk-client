import { useMutation } from "@tanstack/react-query";
import { categoryService } from "../service/categoryService";
import type { CreateCategoryRequest, UpdateCategoryRequest } from "../types";

export function useCreateCategoryMutation() {
    return useMutation({
        mutationFn: (payload: CreateCategoryRequest) =>
            categoryService.create(payload),
    });
}

export function useUpdateCategoryMutation() {
    return useMutation({
        mutationFn: (payload: UpdateCategoryRequest) =>
            categoryService.update(payload),
    });
}
