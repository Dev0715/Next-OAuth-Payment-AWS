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
import { v4 as uuidv4 } from "uuid";

import { getColumnsForMangersTable } from "@/components/admin/managers-column";
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
import { GradientButton } from "@/components/utils/gradient-button";
import { getAllManagers, updateManagerProfile } from "@/data/user";

import { Navbar } from "./_components/navbar";

import type { ManagerData, User } from "@/shared/types/user.type";

const ROWS_PER_PAGE = 10;

const AdminManagement = () => {
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

  const onDelete = (index: number) => {
    setConfirmAlert(true);
    setConfirmTitle("Delete a Manager Profile");
    setConfirmMessage(
      "Are you sure you want to get this user out of the manager role?"
    );

    setEditIndex(index);
  };

  const columns = getColumnsForMangersTable({
    isPending,
    onDelete
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
    getAllManagers(ROWS_PER_PAGE).then((res) => {
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
        if (res.success) {
          const _users = [...users];
          _users[index].manager = _manager;
          setUsers(_users);
        }
      });
    });
  };

  const onNext = () => {
    const currentPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    if (currentPageIndex + 1 === pageCount) {
      startTransition(() => {
        getAllManagers(ROWS_PER_PAGE, lastEvaluatedKey?.userId).then((res) => {
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

  return (
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={isConfirmAlert}
        title={confirmTitle}
        message={confirmMessage}
        onOK={onConfirmOK}
        onCancel={() => setConfirmAlert(false)}
      />
      <Navbar title="Managers" content="" />
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
            <GradientButton
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || isPending}
            >
              Previous
            </GradientButton>
            <GradientButton
              onClick={onNext}
              disabled={!isNextAvailable || isPending}
            >
              Next
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
