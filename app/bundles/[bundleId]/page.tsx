"use client";

import { ProductItem } from "@/components/product/product-item";
import { getBundleById } from "@/data/bundles/bundle-by-id";
import { getProductById } from "@/data/products/product-by-id";
import { Bundle } from "@/shared/types/bundles.type";
import { Product } from "@/shared/types/product.type";
import { useEffect, useState } from "react";

type Props = {
  params: {
    bundleId: string;
  };
};

const BundleDetailPage = ({ params: { bundleId } }: Props) => {
  const [bundle, setBundle] = useState<Bundle>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getBundleById(bundleId).then((res) => {
      setBundle(res || undefined);
      if (res?.products?.length) {
        Promise.all(
          res.products.map(async (productLink) => {
            return await getProductById(
              productLink.productType,
              productLink.productId
            );
          })
        ).then((products) => {
          setProducts(
            products.filter((product) => product !== null) as Product[]
          );
        });
      }
    });
  }, []);

  if (!bundle) {
    return <div className="w-full p-6">Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-y-6 p-6">
      <div className="flex flex-col gap-y-4">
        <p className="text-2xl font-semibold">{bundle.title}</p>
        <p className="w-1/2 text-md">{bundle.description}</p>
        {bundle.price && (
          <p className="text-md">
            Price: <strong>${bundle.price}</strong>
          </p>
        )}
      </div>
      <div className="flex flex-col gap-y-4">
        <p className="text-xl font-medium">Products in this bundel</p>
        <div className="flex flex-wrap gap-4">
          {products.map((product) => (
            <div key={product.productId} className="w-1/4 flex">
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BundleDetailPage;
