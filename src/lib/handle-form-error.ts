import i18n from "@/i18n";
import type { ServerErrorResponse } from "@/types";
import { AxiosError } from "axios";
import { type FieldValues, type Path, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

function tField(code: string, param?: string): string {
    const key = `validation.${code}`;
    const fallback = i18n.t("validation.default");
    return i18n.exists(key) ? i18n.t(key, { count: param ? Number(param) : undefined }) : fallback;
}

function tErrorCode(code?: string): string {
    if (!code) return i18n.t("errorCodes.default");
    const key = `errorCodes.${code}`;
    return i18n.exists(key) ? i18n.t(key) : i18n.t("errorCodes.default");
}

export function handleApiError(error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status >= 500) return;
    const resp = (axiosError.response?.data as ServerErrorResponse) || {};
    toast.error(i18n.t("toast.operationFailed"), {
        description: tErrorCode(resp.error?.code),
    });
}

export function handleFormError<TFieldValues extends FieldValues>(
    error: AxiosError,
    form: UseFormReturn<TFieldValues>
) {
    form.clearErrors();

    const resp = (error.response?.data as ServerErrorResponse) || {};

    if (resp.error?.details) {
        Object.entries(resp.error.details).forEach(([key, val]) => {
            form.setError(key as Path<TFieldValues>, {
                type: "server",
                message: tField(val.code, val.param),
            });
        });

        return;
    }

    if (error.response && error.response.status >= 500) return;

    toast.error(i18n.t("toast.operationFailed"), {
        description: tErrorCode(resp.error?.code),
    });
}
