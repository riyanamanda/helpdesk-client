import type { ServerErrorResponse } from "@/types";
import { AxiosError } from "axios";
import { type FieldValues, type Path, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export function handleFormError<TFieldValues extends FieldValues>(
    error: AxiosError,
    form: UseFormReturn<TFieldValues>
) {
    form.clearErrors();

    const resp = (error.response?.data as ServerErrorResponse) || {};

    if (resp.error?.details) {
        Object.entries(resp.error.details).forEach(([key, val]) => {
            const message = Array.isArray(val) ? String(val[0]) : String(val);
            form.setError(key as Path<TFieldValues>, {
                type: "server",
                message,
            });
        });

        return;
    }

    const errorMessage = resp.error?.message ?? error?.message ?? "Something went wrong";

    toast.error("Operation failed", {
        description: errorMessage,
    });
}
