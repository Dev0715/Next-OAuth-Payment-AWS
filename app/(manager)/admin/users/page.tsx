"use client";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { getColumnsForUsersTable } from "@/components/admin/users-column";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import {
  deleteUserById,
  getAllUsers,
  updateManagerProfile,
  updateUserEnabled
} from "@/data/user";

import { Navbar } from "../_components/navbar";

import type { ManagerData, User } from "@/shared/types/user.type";

type ACTION_TYPE =
  | "delete"
  | "disable"
  | "enable"
  | "make-manager"
  | "delete-manager";

const DIALOG_TITLE: Record<ACTION_TYPE, string> = {
  delete: "Delete User",
  disable: "Disable User",
  enable: "Enable User",
  "make-manager": "Make Manager",
  "delete-manager": "Delete Manager"
};

const DIALOG_MESSAGE: Record<ACTION_TYPE, string> = {
  delete: "Are you sure you want to delete this user?",
  disable: "Are you sure you want to disable this user?",
  enable: "Are you sure you want to enable this user?",
  "make-manager": "Are you sure you want to make this user a manager?",
  "delete-manager": "Are you sure you want to take out manager's role?"
};

const ROWS_PER_PAGE = 10;

const ManagementUsers = () => {
  const [isPending, startTransition] = useTransition();
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [editAction, setEditAction] = useState<ACTION_TYPE>();

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

  const setAction = (action: ACTION_TYPE, index: number) => {
    setEditAction(action);
    setEditIndex(index);
    setConfirmAlert(true);
    setConfirmTitle(DIALOG_TITLE[action]);
    setConfirmMessage(DIALOG_MESSAGE[action]);
  };

  const onCheckedChange = (checked: boolean, index: number) => {
    setAction(checked ? "make-manager" : "delete-manager", index);
  };

  const onDeleteUser = (index: number) => {
    setAction("delete", index);
  };

  const onDisableUser = (disabled: boolean, index: number) => {
    setAction(disabled ? "enable" : "disable", index);
  };

  const columns = getColumnsForUsersTable({
    isPending,
    onCheckedChange,
    onDeleteUser,
    onDisableUser
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
    autoResetPageIndex: false,
    autoResetExpanded: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  useEffect(() => {
    getAllUsers(ROWS_PER_PAGE).then((res) => {
      setUsers(res.items as User[]);
      setLastEvaluatedKey(res.lastEvaluatedKey);
      table.setPageSize(ROWS_PER_PAGE);
    });
  }, [table]);

  const isNextAvailable = useMemo(() => {
    const currentPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    return lastEvaluatedKey || currentPageIndex + 1 < pageCount;
  }, [lastEvaluatedKey, table]);

  const onNext = () => {
    const currentPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    console.log("currentPageIndex", currentPageIndex);
    console.log("pageCount", pageCount);

    if (currentPageIndex + 1 === pageCount) {
      startTransition(() => {
        getAllUsers(ROWS_PER_PAGE, lastEvaluatedKey?.userId).then((res) => {
          if (res.items?.length) {
            setUsers([...users, ...(res.items as User[])]);
            table.nextPage();
          }
          setLastEvaluatedKey(res.lastEvaluatedKey);
        });
      });
    } else {
      table.nextPage();
    }
  };

  const deleteUser = (index: number) => {
    const userId = users[index].userId;

    startTransition(() => {
      deleteUserById(userId).then((res) => {
        if (res.success) {
          const _users = [...users];
          _users.splice(index, 1);
          setUsers(_users);
        } else {
          toast.error("Failed to delete user");
        }
      });
    });
  };

  const setUserEnabled = (index: number, enabled: boolean) => {
    const userId = users[index].userId;

    startTransition(() => {
      updateUserEnabled(userId, enabled).then((res) => {
        if (res.success) {
          const _users = [...users];
          _users[index].disabled = !enabled;
          setUsers(_users);
        }
      });
    });
  };

  const makeManager = (index: number) => {
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

  const onConfirmOK = () => {
    setConfirmAlert(false);

    if (editAction === "delete") deleteUser(editIndex);
    else if (editAction === "disable") setUserEnabled(editIndex, false);
    else if (editAction === "enable") setUserEnabled(editIndex, true);
    else makeManager(editIndex);
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
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || isPending}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              disabled={!isNextAvailable || isPending}
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
