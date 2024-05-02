"use client";

import { useEffect, useState, useTransition } from "react";
import { Navbar } from "../../../_components/navbar";
import { Bundle } from "@/shared/types/types-bundles";
import { getBundleById } from "@/data/bundles/bundle-by-id";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BundleProducts } from "@/components/admin/bundles/bundle-products";
import { Product } from "@/shared/types/types-product";
import { getProductById } from "@/data/products/product-by-id";
import { ProductLink } from "@/shared/types/types-user";

type Props = {
  params: {
    bundleId: string;
  };
};

export default function BundleEditPage({ params: { bundleId } }: Props) {
  const [isPending, startTransition] = useTransition();

  const [bundle, setBundle] = useState<Bundle>();
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getBundleById(bundleId).then((res) => {
      if (res) {
        setBundle(res);
        if (res.products) {
          Promise.all(
            res.products.map(
              async (product: ProductLink) =>
                await getProductById(product.productType, product.productId)
            )
          ).then((products) => {
            setProducts(
              products.filter((product) => product !== null) as Product[]
            );
          });
        }
      }
    });
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-6">
      <Navbar
        title={`Edit Bundle - "${bundle?.title}"`}
        content="You can add products to this bundle or edit the description."
      />
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <p className="text-md">Description for a bundle</p>
          <Textarea
            className="w-1/2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-md">Price</p>
          <Input
            className="w-1/4"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
          />
        </div>
        <BundleProducts isPending={isPending} products={products} />
      </div>
    </div>
  );
}
