"use client";

import { ProductHistory } from "@/components/product/product-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product, ProductState } from "@/shared/types/product.type";
import { Dispatch, SetStateAction, useState } from "react";
import { ProductEditForm } from "./product-edit-form";
import { ProductApplyCard } from "./product-apply-card";

type Props = {
  product: Product;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
};

export const ProductUpdateForm = ({ product, setProduct }: Props) => {
  const [state, setState] = useState<ProductState>(product.approval.state);

  const onUpdateMore = () => {
    setState("updated");
  };

  return (
    <div className="w-full">
      <CardHeader className="w-full flex flex-row items-end justify-between">
        <div className="w-full flex flex-col">
          <CardTitle className="w-full p-2 text-2xl font-medium bg-gray-100 rounded-lg">
            {`${product.productType} / ${product.title}`}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-8">
        <Card className="w-full p-6 flex flex-col gap-y-4">
          <p className="text-xl font-semibold">Product Approval Status</p>
          <ProductHistory history={product.approval.history} />
        </Card>
        {state === "approved" ? (
          <ProductApplyCard product={product} onUpdateMore={onUpdateMore} />
        ) : (
          <ProductEditForm product={product} setProduct={setProduct} />
        )}
      </CardContent>
    </div>
  );
};
