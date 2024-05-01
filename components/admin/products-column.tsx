import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
import { Product, ProductState } from "@/shared/types/types-product";
import Link from "next/link";

type PropsType = {
  isPending: boolean;
};

export const getColumnsForProductsTable = ({ isPending }: PropsType) => {
  const stateText = (product: Product) => {
    const _state: ProductState = product.approval.state;
    if (_state === "created") {
      return "Created, waiting for approval";
    } else if (_state === "approved") {
      return "Approved";
    } else if (_state === "rejected") {
      return "Rejected";
    } else if (_state === "updated") {
      return "Updated, waiting for approval";
    }
  };

  const stateClassName = (product: Product) => {
    const _state: ProductState = product.approval.state;
    if (_state === "created") {
      return "text-white";
    } else if (_state === "approved") {
      return "text-green-700 font-semibold";
    } else if (_state === "rejected") {
      return "text-red-700 font-semibold";
    } else if (_state === "updated") {
      return "text-white";
    }
  };

  const columns: ColumnDef<Product>[] = [
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
      accessorKey: "productType",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("productType")}</div>
      )
    },
    {
      accessorKey: "title",
      header: () => <div className="text-center">Title</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("title")}</div>
      )
    },
    {
      accessorKey: "price",
      header: () => <div className="text-center">Price</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("price")}</div>
      )
    },
    {
      accessorKey: "fileList",
      header: () => <div className="text-center">Uploaded Files</div>,
      cell: ({ row }) => {
        const fileList = row.getValue("fileList") as string[];
        return <div className="text-center font-medium">{fileList.length}</div>;
      }
    },
    {
      accessorKey: "previewList",
      header: () => <div className="text-center">Preview Images</div>,
      cell: ({ row }) => {
        const previewList = row.getValue("previewList") as string[];
        return (
          <div className="text-center font-medium">{previewList.length}</div>
        );
      }
    },
    {
      accessorKey: "State",
      header: () => <div className="text-center">State</div>,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex justify-center">
            <p
              className={`text-sm px-2 bg-black/20 rounded-full ${stateClassName(product)}`}
            >
              {stateText(product)}
            </p>
          </div>
        );
      }
    },
    {
      id: "approve",
      header: () => <div className="text-center">Approve</div>,
      cell: ({ row }) => {
        const _product = row.original;
        return (
          <div className="flex justify-center">
            <Link
              href={`/admin/products/${_product.productType}/${_product.productId}`}
            >
              <Button variant="outline" size="sm" disabled={isPending}>
                Go to Approval
              </Button>
            </Link>
          </div>
        );
      }
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const customer = row.original;
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
              <DropdownMenuItem disabled>Edit Product</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  return columns;
};
