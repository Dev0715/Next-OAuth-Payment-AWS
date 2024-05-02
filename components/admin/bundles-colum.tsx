import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
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
import { Bundle } from "@/shared/types/types-bundles";

type PropsType = {
  isPending: boolean;
};

export const getColumnsForBundlesTable = ({ isPending }: PropsType) => {
  const columns: ColumnDef<Bundle, string | string[]>[] = [
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
      accessorKey: "title",
      header: ({ column }) => (
        <button
          className="inline-flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
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
      accessorKey: "userId",
      header: ({ column }) => (
        <button
          className="inline-flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Id
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
      accessorKey: "bundleId",
      header: ({ column }) => (
        <button
          className="inline-flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bundle Id
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
      accessorKey: "description",
      header: () => <div className="text-right">Description</div>,
      cell: (info) => (
        <div className="text-right font-medium">{info.getValue()}</div>
      )
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: (info) => (
        <div className="text-right font-medium">{info.getValue()}</div>
      )
    },
    {
      accessorKey: "products",
      header: () => <div className="text-right">Products</div>,
      cell: (info) => (
        <div className="text-right font-medium">{info.getValue().length}</div>
      )
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
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
              <DropdownMenuItem disabled>Copy Bundle ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Delete Bundle</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="">Edit Bundle</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  return columns;
};
