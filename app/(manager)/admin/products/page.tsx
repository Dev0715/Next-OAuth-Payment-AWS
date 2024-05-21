"use client";

import {
  getAllApprovedProducts,
  getAllRejectedProducts,
  getAllSubmittedProducts
} from "@/data/product";

import { Navbar } from "../_components/navbar";
import { ProductsTable } from "@/components/admin/products-table";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

export default function Approval() {
  return (
    <main className="w-full flex flex-col gap-y-6">
      <Navbar
        title="All Products"
        content="You can check and approve or reject products"
      />
      <Tabs defaultValue="Submitted" className="w-full flex flex-col gap-y-2">
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
        <TabsContent value="Approved">
          <ProductsTable getProductsAll={getAllApprovedProducts} />
        </TabsContent>
        <TabsContent value="Rejected">
          <ProductsTable getProductsAll={getAllRejectedProducts} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
