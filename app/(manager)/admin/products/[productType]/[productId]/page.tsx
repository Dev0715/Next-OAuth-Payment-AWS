"use client";

import { useAtom } from "jotai";
import { useEffect, useMemo, useState, useTransition } from "react";

import { Loading } from "@/app/_components/loading";

import { ProductApply } from "@/components/admin/products/product-apply";
import { ProductApprovement } from "@/components/admin/products/product-approvement";
import { ProductHistory } from "@/components/product/product-history";

import { ProductInfo } from "@/components/product/product-info";
import { Card, CardTitle } from "@/components/ui/card";
import { ConfirmAlert } from "@/components/utils/confirm-alert";

import { GradientParagraph } from "@/components/utils/gradient-paragraph";

import { getProductById, updateProductState } from "@/data/product";
import { userAtom } from "@/store/user";

import type {
  Product,
  ProductLink,
  ProductState
} from "@/shared/types/product.type";

export default function ProductDetails({ params }: { params: ProductLink }) {
  const [user] = useAtom(userAtom);

  const [isPending, startTransition] = useTransition();
  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [confirmingTitle, setConfirmingTitle] = useState<string>("");
  const [confirmingMessage, setConfirmingMessage] = useState<string>("");

  const [product, setProduct] = useState<Product>();
  const [comment, setComment] = useState<string>("");

  const isSubmitted = useMemo(() => {
    return (
      product?.approval.state === "submitted" ||
      product?.approval.state === "resubmitted"
    );
  }, [product]);

  const isApplied = useMemo(() => {
    return product?.approval.state === "applied";
  }, [product]);

  useEffect(() => {
    if (params.productType && params.productId) {
      getProductById(params.productType, params.productId).then((_product) => {
        setProduct(_product);
      });
    }
  }, [params]);

  if (!product) return <Loading />;

  const checkComment = () => {
    if (comment.length < 10) {
      setConfirming(true);
      setConfirmingTitle("Comment too short");
      setConfirmingMessage(
        "Please write a comment with at least 10 characters"
      );
      return false;
    }
    return true;
  };

  const onCommentProduct = (newState: ProductState) => {
    if (checkComment()) {
      startTransition(() => {
        const updatedProduct = {
          ...product,
          approval: {
            state: newState,
            history: [
              ...product.approval.history,
              {
                state: newState,
                comment,
                userId: user?.userId as string,
                time: new Date().toISOString()
              }
            ]
          }
        };
        updateProductState(updatedProduct).then((res) => {
          if (res.success) {
            setProduct(updatedProduct);
          }
          setComment("");
        });
      });
    }
  };

  const onPublish = () => {
    startTransition(() => {
      const newState: ProductState = "published";
      const updatedProduct = {
        ...product,
        approval: {
          state: newState,
          history: [
            ...product.approval.history,
            {
              state: newState,
              comment: "Published",
              userId: user?.userId as string,
              time: new Date().toISOString()
            }
          ]
        }
      };
      updateProductState(updatedProduct).then((res) => {
        if (res.success) {
          setProduct(updatedProduct);
        }
      });
    });
  };

  return (
    <div className="w-full flex flex-col gap-y-8">
      <ConfirmAlert
        open={isConfirming}
        title={confirmingTitle}
        message={confirmingMessage}
        onOK={() => setConfirming(false)}
      />

      <div className="w-full flex flex-col">
        <CardTitle className="w-full p-2 text-2xl font-medium bg-gray-100 rounded-lg">
          {`${product.productType} / ${product.title}`}
        </CardTitle>
      </div>

      <Card className="p-6 rounded-3xl">
        <div className="w-full flex flex-col gap-y-4">
          <GradientParagraph className="text-2xl font-semibold">
            Product State
          </GradientParagraph>
          <ProductHistory history={product?.approval.history || []} />
        </div>
      </Card>

      {isSubmitted ? (
        <ProductApprovement
          isPending={isPending}
          comment={comment}
          setComment={setComment}
          onCommentProduct={onCommentProduct}
        />
      ) : isApplied ? (
        <ProductApply isPending={isPending} onPublish={onPublish} />
      ) : null}

      <ProductInfo product={product} isPending={isPending} />
    </div>
  );
}
