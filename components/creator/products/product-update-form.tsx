"use client";

import { ProductHistory } from "@/components/product/product-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/shared/types/product.type";
import { Dispatch, SetStateAction } from "react";
import { ProductEditForm } from "./product-edit-form";
import { ProductInfo } from "@/components/product/product-info";
import { Button } from "@/components/ui/button";

type Props = {
  product: Product;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
};

export const ProductUpdateForm = ({ product, setProduct }: Props) => {
  const isApproved = product.approval.state === "approved";
  const isApplied = product.approval.state === "applied";

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
        {isApproved ? (
          <div className="flex flex-col gap-y-4">
            <div className="text-lg">
              <p>Congratulations!</p>
              <p>Your product is approved.</p>
              <p>You can apply for this product to publish.</p>
            </div>

            <div className="flex gap-x-4">
              <Button className="w-64 gap-x-4 rounded-none">
                Apply for publish
              </Button>
            </div>

            <Card className="p-6 rounded-none">
              <ProductInfo product={product} isPending />
            </Card>
          </div>
        ) : (
          <ProductEditForm product={product} setProduct={setProduct} />
        )}
      </CardContent>
    </div>
  );
};
