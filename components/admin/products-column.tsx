import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import type { Product, ProductState } from "@/shared/types/types-product";
import type { BadgeVariant } from "@/components/ui/badge";

const STATE_DISPLAY_Text: Record<ProductState, string> = {
  created: "Created",
  approved: "Approved",
  rejected: "Rejected",
  updated: "Updated"
};

const STATE_BADGE_VARIANT: Record<ProductState, BadgeVariant> = {
  created: "default",
  approved: "success",
  rejected: "destructive",
  updated: "secondary"
};

type PropsType = {
  isPending: boolean;
};

export const getColumnsForProductsTable = ({ isPending }: PropsType) => {
  const getLastReviewer = (product: Product) => {
    const _history = product.approval.history;
    const _userId = _history[_history.length - 1].userId;

    return _userId;
  };

  const columns: ColumnDef<Product, string | string[]>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          disabled={isPending}
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          disabled={isPending}
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: "ownerId",
      header: ({ column }) => (
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
      accessorKey: "approval.state",
      header: () => <div className="text-center">State</div>,
      cell: (info) => {
        return (
          <div className="text-center">
            <Badge
              variant={STATE_BADGE_VARIANT[info.getValue() as ProductState]}
            >
              {STATE_DISPLAY_Text[info.getValue() as ProductState]}
            </Badge>
          </div>
        );
      }
    },
    {
      id: "reviewer",
      header: () => "Reviewer",
      cell: ({ row }) => getLastReviewer(row.original)
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                disabled={isPending}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem disabled>Copy Product ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Delete Product</DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/admin/products/${product.productType}/${product.productId}`}
                >
                  Edit Product
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  return columns;
};
