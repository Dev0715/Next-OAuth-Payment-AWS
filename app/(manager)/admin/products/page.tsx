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
import { useEffect, useMemo, useState, useTransition } from "react";

import { getColumnsForProductsTable } from "@/components/admin/products-column";
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
import { getAllSubmittedProducts } from "@/data/product";

import { Navbar } from "../_components/navbar";

import type { Product, ProductLink } from "@/shared/types/product.type";
import { ProductsTable } from "@/components/admin/products-table";

const ROWS_PER_PAGE = 10;

export default function Approval() {
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
    getAllSubmittedProducts(ROWS_PER_PAGE).then((res) => {
      setProducts(
        res.items.filter(
          (item) =>
            item.approval.state === "submitted" ||
            item.approval.state === "resubmitted"
        ) as Product[]
      );
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
        getAllSubmittedProducts(ROWS_PER_PAGE, lastEvaluatedKey).then((res) => {
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
    <main className="w-full flex flex-col gap-y-6">
      <Navbar
        title="All Products"
        content="You can check and approve or reject products"
      />
      <ProductsTable />
    </main>
  );
}
