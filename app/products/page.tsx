"use client"

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { ProductItem } from "@/components/product/product-item";
import { Navbar } from "./_components/navbar";
import { useEffect, useState } from "react";
import { Product } from "@/shared/types-product";
import { getAllProducts } from "@/data/products/all-products";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then(res => {
      setProducts(res.items);
    })
  }, []);

  return (
    <main className="w-full flex flex-col pt-6">
      <Navbar title="Products" content="You can see all products here" />
      <div className="w-full flex flex-wrap py-6">
        {products.map((product, index) => (
          <div key={index} className="w-1/4 p-2">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </main>
  );
}
