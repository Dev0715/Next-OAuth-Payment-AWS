"use client";

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
    <div className="w-full flex flex-col p-6">
      <p className="text-2xl font-semibold">{bundle.title}</p>
      <p className="text-md">{bundle.description}</p>
      {bundle.price && <p className="text-md">Price: ${bundle.price}</p>}
    </div>
  );
};

export default BundleDetailPage;
