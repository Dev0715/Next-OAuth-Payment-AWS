"use client";

import { ProductsTable } from "@/components/admin/products/products-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductsByState, getSubmittedProducts } from "@/data/product";

import { Navbar } from "../_components/navbar";

export default function Approval() {
  return (
    <main className="w-full flex flex-col gap-y-6">
      <Navbar
        title="All Products"
        content="You can check and approve or reject products"
      />
      <Tabs defaultValue="Applied" className="w-full flex flex-col gap-y-2">
        <TabsList className="px-4 py-2 w-full h-fit flex justify-start gap-x-6">
          <TabsTrigger value="Applied">
            <p className="text-base">Review for Publish</p>
          </TabsTrigger>
          <TabsTrigger value="Submitted">
            <p className="text-base">Review for Approval</p>
          </TabsTrigger>
          <TabsTrigger value="Approved">
            <p className="text-base">Approved</p>
          </TabsTrigger>
          <TabsTrigger value="Rejected">
            <p className="text-base">Rejected</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Applied">
          <ProductsTable getProductsAll={() => getProductsByState("applied")} />
        </TabsContent>
        <TabsContent value="Submitted">
          <ProductsTable getProductsAll={getSubmittedProducts} />
        </TabsContent>
        <TabsContent value="Approved">
          <ProductsTable
            getProductsAll={() => getProductsByState("approved")}
          />
        </TabsContent>
        <TabsContent value="Rejected">
          <ProductsTable
            getProductsAll={() => getProductsByState("rejected")}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
