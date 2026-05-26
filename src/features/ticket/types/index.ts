import type { Division } from "@/features/division/types";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type AttachmentType = "REPORT" | "RESOLUTION";

export interface TicketCategory {
    id: number;
    name: string;
}

export interface TicketUser {
    id: string;
    name: string;
}

export interface TicketAttachment {
    id: number;
    ticket_id: number;
    file_url: string;
    attachment_type: AttachmentType;
    uploaded_by: TicketUser;
    created_at: string;
}

export interface Ticket {
    id: number;
    title: string;
    description: string;
    category: TicketCategory;
    division: Division;
    status: TicketStatus;
    priority: TicketPriority | null;
    created_by: TicketUser;
    assigned_to: TicketUser | null;
    resolved_by: TicketUser | null;
    closed_by: TicketUser | null;
    resolution: string | null;
    assigned_at: string | null;
    resolved_at: string | null;
    closed_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface TicketDetail extends Ticket {
    attachment: TicketAttachment[];
}

export interface TicketCreateFormData {
    title: string;
    description: string;
    category: number;
    division: number;
}

export interface TicketAssignFormData {
    assigned_to: string;
}

export interface TicketPriorityFormData {
    priority: TicketPriority;
}

export interface TicketResolutionFormData {
    resolution: string;
}

export type TicketSortBy = "created_at" | "updated_at" | "status" | "priority";
export type SortType = "ASC" | "DESC";

export interface TicketListParams {
    page?: number;
    limit?: number;
    status?: TicketStatus;
    priority?: TicketPriority;
    category_id?: number;
    division_id?: number;
    assigned_to_id?: string;
    sort_by?: TicketSortBy;
    sort_type?: SortType;
}
