"use client";

import { useEffect, useState } from "react";

import { Loading } from "@/app/_components/loading";
import { getProductById } from "@/data/product";
import { Product, ProductLink } from "@/shared/types/product.type";
import { ProductEditForm } from "@/components/creator/products/product-edit-form";

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
      <ProductEditForm product={product} setProduct={setProduct} />
    </main>
  );
};

export default ProductEdit;
