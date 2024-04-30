"use client";

import { ProductItem } from "@/components/product/product-item";
import { Navbar } from "./_components/navbar";
import { useEffect, useState } from "react";
import { Product } from "@/shared/types/types-product";
import { getAllProducts } from "@/data/products/all-products";

export default function Approval() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res.items);
    });
  }, []);

  return (
    <main className="w-full p-6 flex flex-col">
      <Navbar
        title="All Products"
        content="You can check and approve or reject products"
      />
      <div className="w-full flex flex-wrap py-6">
        {products.map((product, index) => (
          <div key={index} className="w-1/4 p-2">
            <ProductItem product={product} _url="/admin/products" />
          </div>
        ))}
      </div>
    </main>
  );
}
