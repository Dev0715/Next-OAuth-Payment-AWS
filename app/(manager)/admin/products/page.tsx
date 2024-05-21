"use client";

import { getAllSubmittedProducts } from "@/data/product";

import { Navbar } from "../_components/navbar";
import { ProductsTable } from "@/components/admin/products-table";

export default function Approval() {
  return (
    <main className="w-full flex flex-col gap-y-6">
      <Navbar
        title="All Products"
        content="You can check and approve or reject products"
      />
      <ProductsTable getProductsAll={getAllSubmittedProducts} />
    </main>
  );
}
