"use client";

import { ProductItem } from "@/components/product/product-item";
import { Navbar } from "../_components/navbar";
import { useEffect, useState } from "react";
import { Product } from "@/shared/types/types-product";
import { getProductsByType } from "@/data/products/products-by-type";
import { Separator } from "@/components/ui/separator";
import { getProductsCountByType } from "@/data/products/products-count-by-type";
import { ProductPagination } from "../_components/pagination-products";
import { ProductLink } from "@/shared/types/types-user";

type ParamsType = {
  params: {
    productType: string;
  };
};

export default function Products({ params }: ParamsType) {
  const cntPerPage = 1;

  const [products, setProducts] = useState<Product[]>([]);
  const [productCnt, setProductCnt] = useState<number>(0);
  const [stepCnt, setStepCnt] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<ProductLink>();

  useEffect(() => {
    getProductsCountByType(params.productType).then((res) => {
      if (res.cnt) {
        setProductCnt(res.cnt);
        setStepCnt(Math.ceil(res.cnt / cntPerPage));
        setSelectedIndex(1);
      }
    });
    getProductsByType(params.productType, cntPerPage).then((res) => {
      setProducts(res.items);
      if (res.lastEvaluatedKey) {
        setLastEvaluatedKey(res.lastEvaluatedKey);
      }
    });
  }, []);

  const onPreviousPage = () => {
    setSelectedIndex(selectedIndex > 1 ? selectedIndex - 1 : 1);
  };

  const onNextPage = () => {
    const newIndex = selectedIndex < stepCnt ? selectedIndex + 1 : stepCnt;
    setSelectedIndex(newIndex);
    if (newIndex > products.length / cntPerPage) {
    }
  };

  return (
    <main className="w-full flex flex-col pt-6">
      <div className="w-full flex items-end justify-between">
        <Navbar
          title={`${params.productType} Products`}
          content={`You can see all ${params.productType} products here`}
        />
        <div className="w-fit flex flex-col gap-y-2">
          <ProductPagination
            stepCnt={stepCnt}
            selectedIndex={selectedIndex}
            onPrevious={onPreviousPage}
            onNext={onNextPage}
          />
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
