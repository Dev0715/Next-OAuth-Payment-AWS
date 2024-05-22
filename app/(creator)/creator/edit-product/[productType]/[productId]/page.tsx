"use client";

import { useEffect, useState } from "react";

import { Loading } from "@/app/_components/loading";
import { ProductEditForm } from "@/components/creator/products/product-edit-form";

import { FaRecycle, FaSave, FaUpload } from "react-icons/fa";

import { getProductById } from "@/data/product";
import { Product, ProductLink } from "@/shared/types/product.type";

const ProductEdit = ({ params }: { params: ProductLink }) => {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const { productType, productId } = params;
    getProductById(productType, productId).then((product) => {
      setProduct(product || undefined);
    });
  }, [params]);

  if (!product) {
    return <Loading />;
  }

  return (
    <main className="w-full p-6">
      <CardHeader className="w-full flex flex-row items-end justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-2xl font-medium">Edit a Product</CardTitle>
          <CardDescription>
            You can edit your product and our admin users will check it and
            publish soon!
          </CardDescription>
        </div>
        <div className="flex gap-x-6 items-end">
          <Button
            disabled={isPending}
            variant={"outline"}
            className="w-64 gap-x-4 rounded-none border-green-700"
            onClick={form.handleSubmit(() => onSubmit("updated"))}
          >
            <FaSave />
            Update Product
          </Button>

          {isApproved ? (
            <Button
              disabled={isPending}
              className="w-64 gap-x-4 rounded-none"
              onClick={onPublish}
            >
              <FaUpload />
              Publish
            </Button>
          ) : (
            <Button
              disabled={isPending}
              className="w-64 gap-x-4 rounded-none"
              onClick={form.handleSubmit(() =>
                onSubmit(isResubmitted ? "resubmitted" : "submitted")
              )}
            >
              <FaUpload />
              {isResubmitted ? "Resubmit" : "Submit"}
            </Button>
          )}

          {!isEverSubmitted && (
            <QuestionAlert
              title="Confirmation"
              message="Are you sure want to delete this item?"
              onContinue={onDelete}
            >
              <Button
                disabled={isPending}
                variant={"destructive"}
                className="w-64 gap-x-4 rounded-none border-green-700"
              >
                <FaRecycle />
                Delete Product
              </Button>
            </QuestionAlert>
          )}
        </div>
      </CardHeader>
      <ProductEditForm product={product} setProduct={setProduct} />
    </main>
  );
};

export default ProductEdit;
