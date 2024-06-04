"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import { FaTrash } from "react-icons/fa";

import { removeProduct } from "@/actions/product/remove-product";
import { ProductHistory } from "@/components/product/product-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";

import { GradientButton } from "@/components/utils/gradient-button";

import { updateProductState } from "@/data/product";
import { Product, ProductState } from "@/shared/types/product.type";
import { userAtom } from "@/store/user";

import { QuestionAlert } from "../../utils/question-alert";

import { ProductApplyCard } from "./product-apply-card";
import { ProductEditForm } from "./product-edit-form";
import { ProductPublishCard } from "./product-publish-card";

import { ProductRestoreCard } from "./product-restore-card";

import { ProductWithdrawCard } from "./product-withdraw-card";

type Props = {
  product: Product;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
};

export const ProductUpdateForm = ({ product, setProduct }: Props) => {
  const history = useRouter();

  const [user] = useAtom(userAtom);
  const [state, setState] = useState<ProductState>(product.approval.state);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onUpdateMore = () => {
    setState("updated");
  };

  const onDelete = () => {
    if (product.approval.state === "archived") {
      setError("Product is already archived");
    }

    const isEverSubmitted = !!product.approval.history.find(
      (item) => item.state === "submitted" || item.state === "resubmitted"
    );

    if (isEverSubmitted) {
      const newState: ProductState = "archived";
      const updatedProduct = {
        ...product,
        approval: {
          state: newState,
          history: [
            ...product.approval.history,
            {
              state: newState,
              comment: "Product archived",
              userId: user?.userId,
              time: new Date().toISOString()
            }
          ]
        }
      } as Product;

      updateProductState(updatedProduct).then((res) => {
        if (res.success) {
          setProduct(updatedProduct);
          setState(newState);
        }
      });
    } else {
      removeProduct(product, user?.userId as string).then((res) => {
        if (res.success) {
          setSuccess("Product deleted successfully");
          setError("");

          setTimeout(() => {
            history.push(`/creator/${user?.userId}`);
          }, 1000);
        } else {
          setSuccess("");
          setError(res.error || "Failed to delete product");
        }
      });
    }
  };

  const onRestoreFromArchived = () => {
    const newState: ProductState =
      product.approval.history[product.approval.history.length - 2].state;
    const updatedProduct = {
      ...product,
      approval: {
        state: newState,
        history: [
          ...product.approval.history,
          {
            state: newState,
            comment: "Product restored from archived",
            userId: user?.userId,
            time: new Date().toISOString()
          }
        ]
      }
    } as Product;

    updateProductState(updatedProduct).then((res) => {
      if (res.success) {
        setProduct(updatedProduct);
        setState(newState);

        setSuccess("Product restored from archived");
        setError("");
      } else {
        setSuccess("");
        setError("Failed to restore product");
      }
    });
  };

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

    updateProductState(updatedProduct).then((res) => {
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

    updateProductState(updatedProduct).then((res) => {
      if (res.success) {
        setProduct(updatedProduct);
        setState(newState);
      }
    });
  };

  const onWithdrawFromPublished = () => {
    const newState: ProductState = "withdrawn-published";
    const updatedProduct = {
      ...product,
      approval: {
        state: newState,
        history: [
          ...product.approval.history,
          {
            state: newState,
            comment: "Product removed from sale",
            userId: user?.userId,
            time: new Date().toISOString()
          }
        ]
      }
    } as Product;

    updateProductState(updatedProduct).then((res) => {
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
          <CardTitle className="w-full p-2 text-2xl font-firs font-medium bg-gray-100 rounded-lg">
            {`${product.productType} / ${product.title}`}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-8">
        <div
          className="w-full flex flex-col items-end
         gap-y-4"
        >
          <QuestionAlert
            title="Confirmation"
            message="Are you sure want to delete this item?"
            onContinue={onDelete}
          >
            <GradientButton
              variant={"destructive"}
              className="w-64 gap-x-4 rounded-none border-green-700"
            >
              <FaTrash />
              Delete Product
            </GradientButton>
          </QuestionAlert>

          <div className="w-full">
            {success && <FormSuccess message={success} />}
            {error && <FormError message={error} />}
          </div>

          <Card className="w-full p-6 flex flex-col gap-y-4">
            <p className="text-xl font-semibold">Product Approval Status</p>
            <ProductHistory history={product.approval.history} />
          </Card>
        </div>
        {state === "approved" ||
        state === "withdrawn-applied" ||
        state === "withdrawn-published" ? (
          <ProductApplyCard
            product={product}
            onUpdateMore={onUpdateMore}
            onApply={onApply}
          />
        ) : state === "applied" ? (
          <ProductPublishCard
            product={product}
            onWithdrawFromApplied={onWithdrawFromApplied}
          />
        ) : state === "published" ? (
          <ProductWithdrawCard
            product={product}
            onWithdrawFromPublished={onWithdrawFromPublished}
          />
        ) : state === "archived" ? (
          <ProductRestoreCard
            product={product}
            onRestoreFromArchived={onRestoreFromArchived}
          />
        ) : (
          <ProductEditForm product={product} setProduct={setProduct} />
        )}
      </CardContent>
    </div>
  );
};
