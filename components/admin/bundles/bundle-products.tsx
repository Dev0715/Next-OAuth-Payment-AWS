import { Dispatch, SetStateAction, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Product } from "@/shared/types/types-product";
import { getColumnsForBundleProductsTable } from "@/components/admin/bundles/bundle-products-column";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BundleProductSelect } from "./bundle-products-select";

type Props = {
  isPending: boolean;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
};

export const BundleProducts = ({ isPending, products, setProducts }: Props) => {
  const [isAddDlg, setAddDlg] = useState<boolean>(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const onAddNewProducts = (_products: Product[]) => {
    setAddDlg(false);

    const newProducts = _products.filter(
      (_products) =>
        products.findIndex(
          (product) => product.productId === _products.productId
        ) === -1
    );
    setProducts([...products, ...newProducts]);
  };

  const onProductDelete = (productId: string) => {
    setProducts(products.filter((product) => product.productId !== productId));
  };

  const columns = getColumnsForBundleProductsTable({
    isPending,
    onProductDelete
  });
  const table = useReactTable({
    data: products,
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
    <div className="flex flex-col gap-y-2 pt-4">
      <div className="w-full flex items-end justify-between">
        <p className="text-lg font-medium">Products in this bundle</p>
        <Dialog open={isAddDlg} onOpenChange={(opened) => setAddDlg(opened)}>
          <DialogTrigger asChild>
            <Button className="h-8 flex gap-x-2 rounded-none">
              <FaPlus />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full w-[960px]">
            <BundleProductSelect onAddNewProducts={onAddNewProducts} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full flex flex-col gap-y-4">
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
        <div className="flex items-center justify-end space-x-2">
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
