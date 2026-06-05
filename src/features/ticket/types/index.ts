import type { Category } from "@/features/category/types";
import type { Division } from "@/features/division/types";
import type { User } from "@/features/user/types";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
type AttachmentType = "REPORT" | "RESOLUTION";
export type TicketSortBy = "created_at" | "updated_at" | "status" | "priority";
export type SortType = "ASC" | "DESC";

export interface TicketAttachment {
    id: number;
    ticket_id: number;
    file_url: string;
    attachment_type: AttachmentType;
    uploaded_by: Pick<User, "id" | "name">;
    created_at: string;
}

export interface Ticket {
    id: number;
    title: string;
    description: string;
    category: Pick<Category, "id" | "name">;
    division: Division;
    status: TicketStatus;
    priority: TicketPriority | null;
    created_by: Pick<User, "id" | "name">;
    assigned_to: Pick<User, "id" | "name"> | null;
    resolved_by: Pick<User, "id" | "name"> | null;
    closed_by: Pick<User, "id" | "name"> | null;
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

export interface TicketUpdateFormData {
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
