import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants";
import { DeleteDialog } from "@/components/DeleteDialog";
import { formatDate } from "@/lib/formatters";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, XCircleIcon } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { AssignTicketSheet } from "../components/AssignTicketSheet";
import { AttachmentViewer } from "../components/AttachmentViewer";
import { ResolveTicketSheet } from "../components/ResolveTicketSheet";
import { SetPrioritySheet } from "../components/SetPrioritySheet";
import { TicketPriorityBadge, TicketStatusBadge } from "../components/TicketBadges";
import { useCloseTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import { getTicketQueryOption } from "../queries/ticket.query";

export function TicketDetailPage() {
    const { id } = useParams();
    const ticketId = Number(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: response } = useSuspenseQuery(getTicketQueryOption(ticketId));
    const ticket = response.data;

    const { mutate: closeTicket, isPending: isClosing } = useCloseTicketMutation();

    const handleClose = () => {
        closeTicket(ticketId, {
            onSuccess: async () => {
                toast.success("Success", { description: "Ticket closed successfully" });
                await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
                navigate(ROUTES.TICKET.INDEX, { replace: true });
            },
            onError: () => {
                toast.error("Failed", { description: "Could not close the ticket" });
            },
        });
    };

    const reportAttachments =
        ticket.attachment?.filter((a) => a.attachment_type === "REPORT") ?? [];
    const resolutionAttachments =
        ticket.attachment?.filter((a) => a.attachment_type === "RESOLUTION") ?? [];

    return (
        <PageLayout>
            <PageLayout.Header
                title={`Ticket #${ticket.id}`}
                description={ticket.title}
                actions={
                    <NavLink to={ROUTES.TICKET.INDEX}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeftIcon />
                            Back to tickets
                        </Button>
                    </NavLink>
                }
            />
            <PageLayout.Content>
                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Left — main content */}
                    <div className="flex flex-col gap-4 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {ticket.description}
                                </p>
                            </CardContent>
                        </Card>

                        {ticket.resolution && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Resolution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {ticket.resolution}
                                    </p>
                                    {resolutionAttachments.map((a) => (
                                        <div key={a.id} className="mt-3">
                                            <AttachmentViewer fileUrl={a.file_url} />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {reportAttachments.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Attachments</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    {reportAttachments.map((a) => (
                                        <AttachmentViewer key={a.id} fileUrl={a.file_url} />
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right — meta + actions */}
                    <div className="flex flex-col gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <dl className="flex flex-col gap-3 text-xs">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Status</dt>
                                        <dd>
                                            <TicketStatusBadge status={ticket.status} />
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Priority</dt>
                                        <dd>
                                            <TicketPriorityBadge priority={ticket.priority} />
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Category</dt>
                                        <dd>
                                            <Badge variant="outline">
                                                {ticket.category?.name ?? "-"}
                                            </Badge>
                                        </dd>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Reported by</dt>
                                        <dd className="font-medium">
                                            {ticket.created_by?.name ?? "-"}
                                        </dd>
                                    </div>
                                    {ticket.assigned_to && (
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">Assigned to</dt>
                                            <dd className="font-medium">
                                                {ticket.assigned_to.name}
                                            </dd>
                                        </div>
                                    )}
                                    {ticket.resolved_by && (
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">Resolved by</dt>
                                            <dd className="font-medium">
                                                {ticket.resolved_by.name}
                                            </dd>
                                        </div>
                                    )}
                                    {ticket.closed_by && (
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">Closed by</dt>
                                            <dd className="font-medium">{ticket.closed_by.name}</dd>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Created</dt>
                                        <dd>{formatDate(ticket.created_at)}</dd>
                                    </div>
                                    {ticket.assigned_at && (
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">Assigned</dt>
                                            <dd>{formatDate(ticket.assigned_at)}</dd>
                                        </div>
                                    )}
                                    {ticket.resolved_at && (
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">Resolved</dt>
                                            <dd>{formatDate(ticket.resolved_at)}</dd>
                                        </div>
                                    )}
                                    {ticket.closed_at && (
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">Closed</dt>
                                            <dd>{formatDate(ticket.closed_at)}</dd>
                                        </div>
                                    )}
                                </dl>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        {ticket.status !== "CLOSED" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {ticket.status === "OPEN" && (
                                        <AssignTicketSheet ticketId={ticketId} />
                                    )}

                                    {(ticket.status === "OPEN" ||
                                        ticket.status === "IN_PROGRESS") && (
                                        <SetPrioritySheet
                                            ticketId={ticketId}
                                            currentPriority={ticket.priority}
                                        />
                                    )}

                                    {ticket.status === "IN_PROGRESS" && (
                                        <ResolveTicketSheet ticketId={ticketId} />
                                    )}

                                    {ticket.status === "RESOLVED" && (
                                        <DeleteDialog
                                            title="Close Ticket?"
                                            description="This will permanently close the ticket. This action cannot be undone."
                                            onConfirm={handleClose}
                                            isPending={isClosing}
                                            trigger={
                                                <Button variant="destructive" size="sm">
                                                    <XCircleIcon />
                                                    Close Ticket
                                                </Button>
                                            }
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </PageLayout.Content>
        </PageLayout>
    );
}
