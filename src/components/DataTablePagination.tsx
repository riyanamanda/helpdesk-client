import type { Pagination } from "@/types";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import {
    Pagination as PaginationRoot,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const LIMIT_OPTIONS = [10, 20, 50, 100];

interface DataTablePaginationProps {
    pagination: Pagination;
    onPageChange: (page: number) => void;
    onLimitChange?: (limit: number) => void;
}

function getPageRange(page: number, totalPage: number): (number | "...")[] {
    if (totalPage <= 7) {
        return Array.from({ length: totalPage }, (_, i) => i + 1);
    }
    if (page <= 4) {
        return [1, 2, 3, 4, 5, "...", totalPage];
    }
    if (page >= totalPage - 3) {
        return [1, "...", totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    }
    return [1, "...", page - 1, page, page + 1, "...", totalPage];
}

export function DataTablePagination({
    pagination,
    onPageChange,
    onLimitChange,
}: DataTablePaginationProps) {
    const { t } = useTranslation("common");
    const { page, total_page, total, limit } = pagination;
    const from = (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);
    const pages = getPageRange(page, total_page);

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">
                    {t("pagination.showing", { from, to, total })}
                </p>
                {onLimitChange && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            {t("pagination.rowsPerPage")}
                        </span>
                        <Select
                            value={String(limit)}
                            onValueChange={(val) => onLimitChange(Number(val))}
                        >
                            <SelectTrigger className="h-8 w-16">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {LIMIT_OPTIONS.map((opt) => (
                                    <SelectItem key={opt} value={String(opt)}>
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            <PaginationRoot className="mx-0 w-auto">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => page > 1 && onPageChange(page - 1)}
                            aria-disabled={page <= 1}
                            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {pages.map((p, i) =>
                        p === "..." ? (
                            <PaginationItem key={`ellipsis-${i}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={p}>
                                <Button
                                    variant={p === page ? "outline" : "ghost"}
                                    size="icon"
                                    onClick={() => onPageChange(p)}
                                    aria-current={p === page ? "page" : undefined}
                                >
                                    {p}
                                </Button>
                            </PaginationItem>
                        )
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => page < total_page && onPageChange(page + 1)}
                            aria-disabled={page >= total_page}
                            className={page >= total_page ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </PaginationRoot>
        </div>
    );
}
