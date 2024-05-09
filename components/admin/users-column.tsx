import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";

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
import { Switch } from "@/components/ui/switch";

import type { User } from "@/shared/types/user.type";

type PropsType = {
  isPending: boolean;
  onCheckedChange: (checked: boolean, index: number) => void;
};

export const getColumnsForUsersTable = ({
  isPending,
  onCheckedChange
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
      id: "Roles",
      header: () => <div className="text-center">Roles</div>,
      cell: ({ row }) => {
        const user = row.original;

        const roles: string[] = [];
        if (user.creator?.isCreator) roles.push("Creator");
        if (user.customer?.isCustomer) roles.push("Customer");
        if (user.affiliate?.isAffiliate) roles.push("Affiliate");

        return (
          <div className="flex flex-wrap items-center justify-center gap-1">
            {roles.map((role) => (
              <Badge key={role} className="cursor-pointer">
                {role}
              </Badge>
            ))}
          </div>
        );
      }
    },
    {
      id: "Manager",
      header: () => <div className="text-center">Manager</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-center font-medium">
            <Switch
              checked={user.manager && user.manager.isManager}
              onCheckedChange={(checked) => onCheckedChange(checked, row.index)}
            />
          </div>
        );
      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: () => {
        // const customer = row.original;
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
              <DropdownMenuItem disabled>Copy User Email</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Delete User</DropdownMenuItem>
              <DropdownMenuItem disabled>Edit User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  return columns;
};
