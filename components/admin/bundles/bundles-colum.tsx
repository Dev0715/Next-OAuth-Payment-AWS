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
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Bundle, BundleState } from "@/shared/types/types-bundles";
import { QuestionAlert } from "@/components/utils/question-alert";

const STATE_BADGE_VARIANT: Record<BundleState, BadgeVariant> = {
  editing: "default",
  available: "success"
};

type PropsType = {
  isPending: boolean;
  onDeleteBundle: (bundleId: string) => void;
};

export const getColumnsForBundlesTable = ({
  isPending,
  onDeleteBundle
}: PropsType) => {
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
      cell: (info) => <p>{info.getValue()}</p>
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
      cell: (info) => <p>{info.getValue()}</p>
    },
    {
      accessorKey: "description",
      header: () => <div className="text-left">Description</div>,
      cell: (info) => (
        <div className="text-left font-medium">{info.getValue()}</div>
      )
    },
    {
      accessorKey: "price",
      header: () => <div className="text-center">Price</div>,
      cell: (info) => (
        <div className="text-center font-medium">${info.getValue()}</div>
      )
    },
    {
      accessorKey: "products",
      header: () => <div className="text-center">Products</div>,
      cell: (info) => (
        <div className="text-center font-medium">{info.getValue()?.length}</div>
      )
    },
    {
      accessorKey: "state",
      header: () => <div className="text-center">State</div>,
      cell: (info) => (
        <div className="flex justify-center">
          <Badge
            variant={STATE_BADGE_VARIANT[info.getValue() as BundleState]}
            className="capitalize"
          >
            {info.getValue()}
          </Badge>
        </div>
      )
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const bundle = row.original;
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
              <DropdownMenuItem onClick={() => onDeleteBundle(bundle.bundleId)}>
                Delete Bundle
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/admin/bundles/edit/${bundle.bundleId}`}>
                  Edit Bundle
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
