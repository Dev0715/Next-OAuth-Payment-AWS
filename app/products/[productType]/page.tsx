"use client";

import { ProductItem } from "@/components/product/product-item";
import { Navbar } from "../_components/navbar";
import { useEffect, useState } from "react";
import { Product } from "@/shared/types/types-product";
import { getProductsByType } from "@/data/products/products-by-type";
import { Separator } from "@/components/ui/separator";
import { getProductsCountByType } from "@/data/products/products-count-by-type";
import { ProductPagination } from "../_components/pagination-products";

type ParamsType = {
  params: {
    productType: string;
  };
};

export default function Products({ params }: ParamsType) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productCnt, setProductCnt] = useState<number>(0);

  useEffect(() => {
    getProductsCountByType(params.productType).then((res) => {
      if (res.cnt) setProductCnt(res.cnt);
    });
    getProductsByType(params.productType).then((res) => {
      console.log(res);
      setProducts(res.items);
    });
  }, []);

  return (
    <main className="w-full flex flex-col pt-6">
      <div className="w-full flex items-end justify-between">
        <Navbar
          title={`${params.productType} Products`}
          content={`You can see all ${params.productType} products here`}
        />
        <div className="w-fit flex flex-col gap-y-2">
          <ProductPagination totalCnt={productCnt} stepCnt={3} />
          <Separator className="h-[1px]" />
        </div>
      </div>
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
