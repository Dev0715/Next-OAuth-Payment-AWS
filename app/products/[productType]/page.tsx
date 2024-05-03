"use client";

import { ProductItem } from "@/components/product/product-item";
import { Navbar } from "../_components/navbar";
import { useEffect, useState } from "react";
import { getProductsByType } from "@/data/products/products-by-type";
import { Separator } from "@/components/ui/separator";
import { getProductsCountByType } from "@/data/products/products-count-by-type";
import { ProductPagination } from "../_components/pagination-products";

import type { Product, ProductLink } from "@/shared/types/product.type";

type ParamsType = {
  params: {
    productType: string;
  };
};

export default function Products({ params }: ParamsType) {
  const cntPerPage = 16; // numbers of products showed per page

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
      getProductsByType(params.productType, cntPerPage, lastEvaluatedKey).then(
        (res) => {
          setProducts([...products, ...res.items]);
          if (res.lastEvaluatedKey) {
            setLastEvaluatedKey(res.lastEvaluatedKey);
          }
        }
      );
    }
  };

  return (
    <main className="w-full p-6 flex flex-col">
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
      <div className="pt-4">
        <p className="text-xl font-semibold">{productCnt} Products</p>
      </div>
      <div className="w-full flex flex-wrap pt-6">
        {[...Array(cntPerPage)].map((value, index) => {
          const _index = index + (selectedIndex - 1) * cntPerPage;
          return _index < products.length ? (
            <div key={index} className="w-1/4 p-2">
              <ProductItem product={products[_index]} />
            </div>
          ) : null;
        })}
      </div>
    </main>
  );
}
