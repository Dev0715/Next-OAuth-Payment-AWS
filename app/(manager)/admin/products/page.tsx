"use client";

import { getAllSubmittedProducts } from "@/data/product";

import { Navbar } from "../_components/navbar";
import { ProductsTable } from "@/components/admin/products-table";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";

export default function Approval() {
  return (
    <main className="w-full flex flex-col gap-y-6">
      <Navbar
        title="All Products"
        content="You can check and approve or reject products"
      />
      <Tabs defaultValue="Submitted">
        <TabsList className="w-full h-fit flex gap-x-16">
          <TabsTrigger value="Submitted">
            <p className="text-base">Submitted</p>
          </TabsTrigger>
          <TabsTrigger value="Rejected">
            <p className="text-base">Rejected</p>
          </TabsTrigger>
          <TabsTrigger value="Submitted">
            <p className="text-base">Submitted</p>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <ProductsTable getProductsAll={getAllSubmittedProducts} />
    </main>
  );
}
