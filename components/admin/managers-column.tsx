import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

import type { User } from "@/shared/types/user.type";
import { Button } from "../ui/button";

type PropsType = {
  isPending: boolean;
  onDelete: (index: number) => void;
};

export const getColumnsForMangersTable = ({
  isPending,
  onDelete
}: PropsType) => {
  const columns: ColumnDef<User, string>[] = [
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
      accessorKey: "userId",
      header: ({ column }) => (
        <button
          className="inline-flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User ID
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </button>
      ),
      cell: (info) => <div className="lowercase">{info.getValue()}</div>
    },
    {
      accessorKey: "firstname",
      header: () => "First Name",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>
    },
    {
      accessorKey: "lastname",
      header: () => "Last Name",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>
    },
    {
      accessorKey: "email",
      header: () => "Email",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>
    },
    {
      accessorKey: "emailVerified",
      header: () => "Created",
      cell: (info) => (
        <span className="font-medium">
          {new Date(info.getValue()).toLocaleString()}
        </span>
      )
    },
    {
      id: "delete",
      header: () => "Delete",
      cell: ({ row }) => (
        <Button
          variant={"destructive"}
          className="h-6 rounded-none"
          onClick={() => onDelete(row.index)}
        >
          Delete
        </Button>
      )
    }
  ];

  return columns;
};
