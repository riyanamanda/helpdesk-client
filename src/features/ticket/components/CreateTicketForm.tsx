import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ROUTES } from "@/constants";
import { listCategoryQueryOption } from "@/features/category/queries/category.query";
import { handleFormError } from "@/lib/handle-form-error";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { PaperclipIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useCreateTicketMutation } from "../mutation/ticket.mutation";
import { TICKET_QUERY_KEYS } from "../queries";
import type { TicketCreateFormData } from "../types";
import { listDivisionQueryOption } from "@/features/division/queries/division.query";

export function CreateTicketForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useCreateTicketMutation();
    const [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { data: categoriesData } = useQuery(listCategoryQueryOption({ page: 1, limit: 100 }));
    const categories = categoriesData?.data ?? [];

    const { data: divisionsData } = useQuery(listDivisionQueryOption({ page: 1, limit: 10 }));
    const divisions = divisionsData?.data ?? [];

    const form = useForm<TicketCreateFormData>({
        defaultValues: { title: "", description: "", category: undefined, division: undefined },
        mode: "onSubmit",
    });

    const onSubmit = (data: TicketCreateFormData) => {
        mutate(
            { data, file: file ?? undefined },
            {
                onSuccess: async () => {
                    toast.success("Success", {
                        description: "Ticket created successfully",
                    });
                    await queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ROOT });
                    navigate(ROUTES.TICKET.INDEX, { replace: true });
                },
                onError: (error) => {
                    handleFormError(error as AxiosError, form);
                },
            }
        );
    };

    return (
        <Card className="mx-auto max-w-2xl">
            <CardHeader>
                <CardTitle>Submit New Ticket</CardTitle>
                <CardDescription>Please fill all required fields</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="title">
                                        Title
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        autoComplete="off"
                                        placeholder="Brief summary of the issue"
                                        maxLength={100}
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="description">
                                        Description
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id={field.name}
                                        rows={4}
                                        placeholder="Describe the issue in detail"
                                        maxLength={255}
                                    />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="category"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="category">
                                            Category
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            value={field.value ? String(field.value) : ""}
                                            onValueChange={(v) => field.onChange(Number(v))}
                                        >
                                            <SelectTrigger id="category_id">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={String(category.id)}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="division"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="division">
                                            Division
                                            <span className="text-destructive">*</span>
                                        </FieldLabel>
                                        <Select
                                            value={field.value ? String(field.value) : ""}
                                            onValueChange={(v) => field.onChange(Number(v))}
                                        >
                                            <SelectTrigger id="division_id">
                                                <SelectValue placeholder="Select division" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {divisions.map((divison) => (
                                                    <SelectItem
                                                        key={divison.id}
                                                        value={String(divison.id)}
                                                    >
                                                        {divison.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        <Field>
                            <FieldLabel>Attachment (optional)</FieldLabel>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <PaperclipIcon />
                                    {file ? file.name : "Choose image"}
                                </Button>
                                {file && (
                                    <button
                                        type="button"
                                        className="cursor-pointer text-xs text-muted-foreground hover:text-destructive"
                                        onClick={() => {
                                            setFile(null);
                                            if (fileRef.current) fileRef.current.value = "";
                                        }}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            />
                            <p className="text-xs text-muted-foreground">JPEG/PNG, max 2MB</p>
                        </Field>

                        <Field orientation="horizontal" className="justify-end">
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={isPending}
                                onClick={() => navigate(ROUTES.TICKET.INDEX)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                Submit Ticket
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
