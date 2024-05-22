"use client";

import { useAtom } from "jotai";
import { useEffect, useMemo, useState, useTransition } from "react";

import { ProductApprovement } from "@/components/admin/products/product-approvement";
import { ProductHistory } from "@/components/product/product-history";

import { Card } from "@/components/ui/card";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { getProductById, updateProductApproval } from "@/data/product";

import { userAtom } from "@/store/user";

import { Navbar } from "../../../_components/navbar";

import type {
  Product,
  ProductLink,
  ProductState
} from "@/shared/types/product.type";
import { ProductInfo } from "@/components/product/product-info";

export default function ProductDetails({ params }: { params: ProductLink }) {
  const [user] = useAtom(userAtom);

  const [isPending, startTransition] = useTransition();
  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [confirmingTitle, setConfirmingTitle] = useState<string>("");
  const [confirmingMessage, setConfirmingMessage] = useState<string>("");

  const [product, setProduct] = useState<Product>();
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (params.productType && params.productId) {
      getProductById(params.productType, params.productId).then((_product) => {
        setProduct(_product);
      });
    }
  }, [params]);

  const isApproval = useMemo(() => {
    return (
      product?.approval.state === "submitted" ||
      product?.approval.state === "resubmitted"
    );
  }, [product]);

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

  const onCommentProduct = (isApprove: boolean) => {
    if (!checkComment()) {
      return;
    }

    startTransition(() => {
      const history = [...(product?.approval.history || [])];
      const state: ProductState = isApprove ? "approved" : "rejected";
      history.push({
        state,
        comment,
        userId: user?.userId as string,
        time: new Date().toISOString()
      });
      const approval = { state, history };
      updateProductApproval({
        productType: params.productType,
        productId: params.productId,
        approval
      }).then((res) => {
        if (res) {
          setProduct((prev) => {
            if (prev) {
              return { ...prev, approval };
            }
            return prev;
          });
        }
        setComment("");
      });
    });
  };

  if (!product) return;

  return (
    <div className="w-full flex flex-col gap-y-8">
      <ConfirmAlert
        open={isConfirming}
        title={confirmingTitle}
        message={confirmingMessage}
        onOK={() => setConfirming(false)}
      />
      <Navbar
        title={`Approval for Product - ${product?.title}`}
        content="You can check the details of product and approve it"
      />
      <ProductInfo product={product} isPending={isPending} />
      <Card className="p-6 rounded-none">
        <div className="w-full flex flex-col gap-y-4">
          <p className="text-2xl font-semibold">Product History</p>
          <ProductHistory history={product?.approval.history || []} />
        </div>
      </Card>
      {/* {isApproval ? ( */}
      <ProductApprovement
        isPending={isPending}
        comment={comment}
        setComment={setComment}
        onCommentProduct={onCommentProduct}
      />
      {/* ) : null} */}
    </div>
  );
}
