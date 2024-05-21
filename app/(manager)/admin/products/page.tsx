"use client";

import { getAllSubmittedProducts } from "@/data/product";

import { Navbar } from "../_components/navbar";
import { ProductsTable } from "@/components/admin/products-table";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";

export default function Approval() {
  return (
    <main className="w-full flex flex-col gap-y-6">
      <Navbar
        title="All Products"
        content="You can check and approve or reject products"
      />
      <Tabs defaultValue="Submitted" className="w-full flex flex-col gap-y-6">
        <TabsList className="px-6 w-full h-fit flex justify-start gap-x-6">
          <TabsTrigger value="Submitted">
            <p className="text-base">Review</p>
          </TabsTrigger>
          <TabsTrigger value="Approved">
            <p className="text-base">Approved</p>
          </TabsTrigger>
          <TabsTrigger value="Rejected">
            <p className="text-base">Rejected</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Submitted">
          <ProductsTable getProductsAll={getAllSubmittedProducts} />
        </TabsContent>
        <TabsContent value="Approved"></TabsContent>
        <TabsContent value="Rejected"></TabsContent>
      </Tabs>
    </main>
  );
}
