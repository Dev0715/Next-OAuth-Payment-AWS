"use client";

import { ProductItem } from "@/components/product/product-item";
import { Navbar } from "../_components/navbar";
import { useEffect, useState } from "react";
import { Product } from "@/shared/types/types-product";
import { getProductsByType } from "@/data/products/products-by-type";

type ParamsType = {
  params: {
    productType: string;
  };
};

export default function Products({ params }: ParamsType) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsByType(params.productType).then((res) => {
      console.log(res);
      setProducts(res.items);
    });
  }, []);

  return (
    <main className="w-full flex flex-col pt-6">
      <Navbar
        title={`${params.productType} Products`}
        content={`You can see all ${params.productType} products here`}
      />
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
