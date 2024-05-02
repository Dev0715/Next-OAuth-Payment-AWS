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
import { v4 as uuidv4 } from "uuid";

import { updateManagerProfile } from "@/data/user/manager-update";
import { getAllUsers } from "@/data/user/users-all";
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
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getColumnsForUsersTable } from "@/components/admin/users-column";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { Navbar } from "../_components/navbar";
import type { ManagerData, User } from "@/shared/types/user.type";

const ROWS_PER_PAGE = 1;

const ManagementUsers = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [editIndex, setEditIndex] = useState<number>(0);

  const [isConfirmAlert, setConfirmAlert] = useState<boolean>(false);
  const [confirmTitle, setConfirmTitle] = useState<string>("");
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const [users, setUsers] = useState<User[]>([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] =
    useState<Record<string, string>>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    getAllUsers(ROWS_PER_PAGE).then((res) => {
      setUsers(res.items as User[]);
      setLastEvaluatedKey(res.lastEvaluatedKey);
      table.setPageSize(ROWS_PER_PAGE);
    });
  }, []);

  const onCheckedChange = (checked: boolean, index: number) => {
    setConfirmAlert(true);
    setConfirmTitle("Update Manager Profile");
    if (checked) {
      setConfirmMessage("Are you sure you want to set this user as a manager?");
    } else {
      setConfirmMessage(
        "Are you sure you want to get this user out of the manager role?"
      );

      setEditIndex(index);
    }
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

  const onConfirmOK = () => {
    setConfirmAlert(false);
    const index = editIndex;
    const checked = !(users[index].manager && users[index].manager?.isManager);

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

  const isNextAvailable = () => {
    const currentPageIndex = table.getState().pagination.pageIndex;
  };

  const onPrevious = () => {
    table.previousPage();
    console.log(table.getPageCount());
  };

  const onNext = () => {
    console.log();
    table.nextPage();
    // startTransition(() => {
    //   if (lastEvaluatedKey) {
    //     getAllUsers(ROWS_PER_PAGE, lastEvaluatedKey?.userId).then((res) => {
    //       setUsers([...users, ...(res.items as User[])]);
    //       setLastEvaluatedKey(res.lastEvaluatedKey);

    //       table.nextPage();
    //     });
    //   }
    // });
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={isConfirmAlert}
        title={confirmTitle}
        message={confirmMessage}
        onOK={onConfirmOK}
        onCancel={() => setConfirmAlert(false)}
      />
      <Navbar title="Users" content="You can assign manager's role" />
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
                .map((column) => (
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
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
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
              onClick={onPrevious}
              // disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              // disabled={!table.getCanNextPage()}
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
