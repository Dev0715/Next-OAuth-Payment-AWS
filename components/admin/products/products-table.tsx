import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";

import { getColumnsForProductsTable } from "@/components/admin/products/products-column";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { GradientButton } from "@/components/utils/gradient-button";

import type { Product, ProductLink } from "@/shared/types/product.type";

const ROWS_PER_PAGE = 10;

type Props = {
  getProductsAll: (
    limit?: number,
    exclusiveStartKey?: ProductLink
  ) => Promise<
    | {
        items: Product[];
        lastEvaluatedKey:
          | Record<string, string>
          | Record<string, ProductLink>
          | undefined;
      }
    | {
        items: never[];
        lastEvaluatedKey?: undefined;
      }
  >;
};

export const ProductsTable = ({ getProductsAll }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<Product[]>([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<ProductLink>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = getColumnsForProductsTable({ isPending });
  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    autoResetPageIndex: false,
    autoResetExpanded: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  useEffect(() => {
    getProductsAll(ROWS_PER_PAGE).then((res) => {
      setProducts(res.items as Product[]);
      setLastEvaluatedKey(res.lastEvaluatedKey as ProductLink);
      table.setPageSize(ROWS_PER_PAGE);
    });
  }, [table]);

  const isNextAvailable = useMemo(() => {
    const currentPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    return lastEvaluatedKey || currentPageIndex + 1 < pageCount;
  }, [lastEvaluatedKey, table]);

  const onNext = () => {
    const currentPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    if (currentPageIndex + 1 === pageCount) {
      startTransition(() => {
        getProductsAll(ROWS_PER_PAGE, lastEvaluatedKey).then((res) => {
          if (res.items?.length) {
            setProducts([...products, ...(res.items as Product[])]);
            table.nextPage();
          }
          setLastEvaluatedKey(res.lastEvaluatedKey as ProductLink);
        });
      });
    } else {
      table.nextPage();
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex items-center gap-x-4">
        <div className="flex gap-x-4">
          <Input
            disabled={isPending}
            placeholder="Filter Creator"
            value={
              (table.getColumn("ownerId")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("ownerId")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
          <Input
            disabled={isPending}
            placeholder="Filter Product"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <GradientButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isPending}
          >
            Previous
          </GradientButton>
          <GradientButton
            onClick={onNext}
            disabled={!isNextAvailable || isPending}
          >
            Next
          </GradientButton>
        </div>
      </div>
    </div>
  );
};
