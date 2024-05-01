"use client";

import { ProductItem } from "@/components/product/product-item";
import { Navbar } from "../_components/navbar";
import { useEffect, useState, useTransition } from "react";
import { Product } from "@/shared/types/types-product";
import { getAllProducts } from "@/data/products/all-products";
import { getColumnsForProductsTable } from "@/components/admin/products-column";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

export default function Approval() {
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<Product[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res.items);
    });
  }, []);

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <main className="w-full flex flex-col">
      <Navbar
        title="All Products"
        content="You can check and approve or reject products"
      />
      <div className="w-full flex flex-wrap py-6">
        {products.map((product, index) => (
          <div key={index} className="w-1/4 p-2">
            <ProductItem product={product} _url="/admin/products" />
          </div>
        ))}
      </div>
    </main>
  );
}
