"use client";

import { ProductHistory } from "@/components/product/product-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/shared/types/product.type";
import { Dispatch, SetStateAction } from "react";
import { ProductEditForm } from "./product-edit-form";

type Props = {
  product: Product;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
};

export const ProductUpdateForm = ({ product, setProduct }: Props) => {
  return (
    <div className="w-full">
      <CardHeader className="w-full flex flex-row items-end justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-2xl font-medium">
            Update a Product
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-end gap-y-8">
        <Card className="w-full p-6 flex flex-col gap-y-4">
          <p className="text-xl font-semibold">Product Approval Status</p>
          <ProductHistory history={product.approval.history} />
        </Card>
      </CardContent>
      <ProductEditForm product={product} setProduct={setProduct} />
    </div>
  );
};
