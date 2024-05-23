"use client";

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
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { FaPlus } from "react-icons/fa";

import { useToast } from "@/components/ui/use-toast";
import { getColumnsForBundlesTable } from "@/components/admin/bundles/bundles-colum";
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
import { deleteBundle, getAllBundles } from "@/data/bundle";

import { Navbar } from "../_components/navbar";

import type { Bundle } from "@/shared/types/bundles.type";

const ROWS_PER_PAGE = 10;

const ManagementBundles = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] =
    useState<Record<string, string>>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const onDeleteBundle = (bundleId: string) => {
    startTransition(() => {
      deleteBundle(bundleId).then((res) => {
        if (res?.success) {
          setBundles(bundles.filter((bundle) => bundle.bundleId !== bundleId));
        } else {
          toast({ title: "Failed to delete bundle.", variant: "destructive" });
        }
      });
    });
  };

  const columns = getColumnsForBundlesTable({ isPending, onDeleteBundle });
  const table = useReactTable({
    data: bundles,
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
    getAllBundles(ROWS_PER_PAGE).then((res) => {
      setBundles(res.items as Bundle[]);
      setLastEvaluatedKey(res.lastEvaluatedKey);
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
        getAllBundles(ROWS_PER_PAGE, lastEvaluatedKey?.bundleId).then((res) => {
          if (res.items?.length) {
            setBundles([...bundles, ...(res.items as Bundle[])]);
            table.nextPage();
          }
          setLastEvaluatedKey(res.lastEvaluatedKey);
        });
      });
    } else {
      table.nextPage();
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <Navbar title="Bundles" content="You can manage bundles" />
      <div className="w-full flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <div className="flex gap-x-4">
            <Input
              disabled={isPending}
              placeholder="Filter Title"
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-xs"
            />
            <Input
              disabled={isPending}
              placeholder="Filter User"
              value={
                (table.getColumn("userId")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("userId")?.setFilterValue(event.target.value)
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button disabled={isPending}>
            <Link
              href="/admin/bundles/new"
              className="flex items-center gap-x-2"
            >
              <FaPlus />
              Add New
            </Link>
          </Button>
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || isPending}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              disabled={!isNextAvailable || isPending}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementBundles;
