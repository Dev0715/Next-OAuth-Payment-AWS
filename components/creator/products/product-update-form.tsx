"use client";

import { useAtom } from "jotai";
import { Dispatch, SetStateAction, useState } from "react";

import { ProductHistory } from "@/components/product/product-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProductApproval } from "@/data/product";
import { Product, ProductState } from "@/shared/types/product.type";
import { userAtom } from "@/store/user";

import { ProductApplyCard } from "./product-apply-card";
import { ProductEditForm } from "./product-edit-form";
import { ProductPublishCard } from "./product-publish-card";

type Props = {
  product: Product;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
};

export const ProductUpdateForm = ({ product, setProduct }: Props) => {
  const [user] = useAtom(userAtom);
  const [state, setState] = useState<ProductState>(product.approval.state);

  const onUpdateMore = () => {
    setState("updated");
  };

  const onDelete = () => {};

  const onApply = () => {
    const newState: ProductState = "applied";
    const updatedProduct = {
      ...product,
      approval: {
        state: newState,
        history: [
          ...product.approval.history,
          {
            state: newState,
            comment: "Product applied for publish",
            userId: user?.userId,
            time: new Date().toISOString()
          }
        ]
      }
    } as Product;

    updateProductApproval(updatedProduct).then((res) => {
      if (res.success) {
        setProduct(updatedProduct);
        setState(newState);
      }
    });
  };

  const onWithdrawFromApplied = () => {
    const newState: ProductState = "withdrawn-applied";
    const updatedProduct = {
      ...product,
      approval: {
        state: newState,
        history: [
          ...product.approval.history,
          {
            state: newState,
            comment: "Product withdrawn from applied state",
            userId: user?.userId,
            time: new Date().toISOString()
          }
        ]
      }
    } as Product;

    updateProductApproval(updatedProduct).then((res) => {
      if (res.success) {
        setProduct(updatedProduct);
        setState(newState);
      }
    });
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
        {state === "approved" || state === "withdrawn-applied" ? (
          <ProductApplyCard
            product={product}
            onUpdateMore={onUpdateMore}
            onApply={onApply}
          />
        ) : state === "applied" || state === "withdrawn-published" ? (
          <ProductPublishCard
            product={product}
            onWithdrawFromApplied={onWithdrawFromApplied}
          />
        ) : (
          <ProductEditForm
            product={product}
            setProduct={setProduct}
            onDelete={onDelete}
          />
        )}
      </CardContent>
    </div>
  );
};
