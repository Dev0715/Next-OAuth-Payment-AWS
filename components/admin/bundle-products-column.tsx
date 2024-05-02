import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import type { Product } from "@/shared/types/types-product";

type PropsType = {
  isPending: boolean;
};

export const getColumnsForBundleProductsTable = ({ isPending }: PropsType) => {
  const columns: ColumnDef<Product, string | string[]>[] = [
    {
      accessorKey: "ownerId",
      header: ({ column }) => (
        <div className="flex justify-center">
          <button
            className="inline-flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Creator
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </button>
        </div>
      ),
      cell: (info) => info.getValue()
    },
    {
      accessorKey: "productType",
      header: ({ column }) => (
        <button
          className="inline-flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Type
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </button>
      ),
      cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>
    },
    {
      accessorKey: "title",
      header: () => "Title",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: (info) => (
        <div className="text-right font-medium">{info.getValue()}</div>
      )
    },
    {
      accessorKey: "fileList",
      header: () => <div className="text-right">Uploaded Files</div>,
      cell: (info) => (
        <div className="text-right font-medium">{info.getValue().length}</div>
      )
    },
    {
      accessorKey: "previewList",
      header: () => <div className="text-right">Preview Images</div>,
      cell: (info) => (
        <div className="text-right font-medium">{info.getValue().length}</div>
      )
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-center">Remove</div>,
      cell: ({ row }) => {
        const product = row.original;
        return <Button>Remove</Button>;
      }
    }
  ];

  return columns;
};
