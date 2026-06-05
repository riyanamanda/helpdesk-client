import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
    type OnChangeFn,
    type SortingState,
} from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, DatabaseIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[] | undefined;
    isLoading?: boolean;
    sorting?: SortingState;
    onSortingChange?: OnChangeFn<SortingState>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    sorting,
    onSortingChange,
}: DataTableProps<TData, TValue>) {
    const { t } = useTranslation("common");
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        state: { sorting: sorting ?? [] },
        onSortingChange,
    });

    return (
        <div className="w-full max-w-full overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const isSortable = header.column.getCanSort();
                                const sortDir = header.column.getIsSorted();

                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : isSortable ? (
                                            <button
                                                onClick={header.column.getToggleSortingHandler()}
                                                className="flex cursor-pointer items-center gap-1 select-none hover:text-foreground"
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {sortDir === "asc" ? (
                                                    <ArrowUpIcon className="size-3.5" />
                                                ) : sortDir === "desc" ? (
                                                    <ArrowDownIcon className="size-3.5" />
                                                ) : (
                                                    <ChevronsUpDownIcon className="size-3.5 text-muted-foreground" />
                                                )}
                                            </button>
                                        ) : (
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((_, colIndex) => (
                                    <TableCell key={colIndex}>
                                        <Skeleton className="h-4 w-full" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={columns.length} className="h-36">
                                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                    <DatabaseIcon className="size-8 opacity-40" />
                                    <p className="text-sm font-medium">{t("table.empty")}</p>
                                    <p className="text-xs">{t("table.emptyHint")}</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
