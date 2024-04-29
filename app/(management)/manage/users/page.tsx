"use client";

import { useEffect, useState, useTransition } from "react";
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
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ManagerData, User } from "@/shared/types/types-user";
import { getAllUsers } from "@/data/user/users-all";
import { getColumnsForUsersTable } from "../_components/users-column";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { updateManagerProfile } from "@/data/user/manager-update";

const ManagementUsers = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const [isConfirmAlert, setConfirmAlert] = useState<boolean>(false);
  const [confirmTitle, setConfirmTitle] = useState<string>("");
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const [users, setUsers] = useState<User[]>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.items);
    });
  }, []);

  const onCheckedChange = (checked: boolean, index: number) => {
    setConfirmAlert(true);
    setConfirmTitle("Update Manager Profile");
    if (checked)
      setConfirmMessage("Are you sure you want to set this user as a manager?");
    else
      setConfirmMessage(
        "Are you sure you want to get this user out of the manager role?"
      );

    startTransition(() => {
      const _manager: ManagerData = {
        managerId: users[index].manager?.managerId || uuidv4(),
        isManager: checked
      };

      updateManagerProfile(users[index].userId, _manager).then((res) => {
        if (res) {
          const _users = [...users];
          _users[index].manager = _manager;
          setUsers(_users);
        }
      });
    });
  };

  const columns = getColumnsForUsersTable({
    isPending,
    onCheckedChange
  });

  const table = useReactTable({
    data: users,
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
    <div className="w-full flex flex-col pt-6">
      <div className="w-full flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <Input
            disabled={isPending}
            placeholder="Filter User ID"
            value={
              (table.getColumn("userId")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("userId")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementUsers;
