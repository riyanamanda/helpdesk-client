import { useMutation } from "@tanstack/react-query";
import { ticketService } from "../service/ticketService";
import type {
    TicketAssignFormData,
    TicketCreateFormData,
    TicketPriorityFormData,
    TicketResolutionFormData,
    TicketUpdateFormData,
} from "../types";

export function useCreateTicketMutation() {
    return useMutation({
        mutationFn: ({ data, file }: { data: TicketCreateFormData; file?: File }) =>
            ticketService.create(data, file),
    });
}

export function useUpdateTicketMutation() {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: TicketUpdateFormData }) =>
            ticketService.update(id, payload),
    });
}

export function useDeleteTicketMutation() {
    return useMutation({
        mutationFn: (id: number) => ticketService.delete(id),
    });
}

export function useAssignTicketMutation() {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: TicketAssignFormData }) =>
            ticketService.assign(id, payload),
    });
}

export function useSetPriorityMutation() {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: TicketPriorityFormData }) =>
            ticketService.setPriority(id, payload),
    });
}

export function useResolveTicketMutation() {
    return useMutation({
        mutationFn: ({
            id,
            data,
            file,
        }: {
            id: number;
            data: TicketResolutionFormData;
            file?: File;
        }) => ticketService.resolve(id, data, file),
    });
}

export function useCloseTicketMutation() {
    return useMutation({
        mutationFn: (id: number) => ticketService.close(id),
    });
}
