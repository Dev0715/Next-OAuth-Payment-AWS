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
import { Badge } from "@/components/ui/badge";
import { User } from "@/shared/types/types-user";
import { Switch } from "@/components/ui/switch";

type PropsType = {
  isPending: boolean;
  onCheckedChange: (checked: boolean, index: number) => void;
};

export const getColumnsForUsersTable = ({
  isPending,
  onCheckedChange
}: PropsType) => {
  const columns: ColumnDef<User>[] = [
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("userId")}</div>
      )
    },
    {
      accessorKey: "firstname",
      header: () => <div className="text-center">First Name</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("firstname")}
        </div>
      )
    },
    {
      accessorKey: "lastname",
      header: () => <div className="text-center">Last Name</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("lastname")}
        </div>
      )
    },
    {
      accessorKey: "email",
      header: () => <div className="text-center">Email</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("email")}</div>
      )
    },
    {
      accessorKey: "Roles",
      header: () => <div className="text-center">Roles</div>,
      cell: ({ row }) => {
        const user = row.original;

        const roles: string[] = [];
        if (user.creator) roles.push("Creator");
        if (user.customer) roles.push("Customer");
        if (user.affiliate) roles.push("Affiliate");

        return (
          <div className="flex flex-wrap items-center justify-center gap-1">
            {roles.map((role: string) => (
              <Badge key={role} className="cursor-pointer">
                {role}
              </Badge>
            ))}
          </div>
        );
      }
    },
    {
      accessorKey: "Manager",
      header: () => <div className="text-center">Manager</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-center font-medium">
            <Switch
              checked={!!user.manager}
              onCheckedChange={(checked: boolean) =>
                onCheckedChange(checked, row.index)
              }
            />
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
