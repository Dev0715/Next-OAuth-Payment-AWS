"use client";

import { useEffect, useState, useTransition } from "react";
import { Navbar } from "../../../_components/navbar";
import { getBundleById, updateBundle } from "@/data/bundle";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BundleProducts } from "@/components/admin/bundles/bundle-products";
import { getProductById } from "@/data/products/product-by-id";
import { Button } from "@/components/ui/button";
import { FaSave } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { FormError } from "@/components/utils/form-error";

import type { Bundle } from "@/shared/types/bundles.type";
import type { Product, ProductLink } from "@/shared/types/product.type";

type Props = {
  params: {
    bundleId: string;
  };
};

export default function BundleEditPage({ params: { bundleId } }: Props) {
  const history = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isAvailable, setAvailable] = useState<boolean>(false);
  const [isServerError, setServerError] = useState<boolean>(false);

  const [bundle, setBundle] = useState<Bundle>();
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getBundleById(bundleId).then((res) => {
      if (res) {
        setBundle(res);

        setDescription(res.description || "");
        setPrice(res.price || 0);
        if (res.state === "available") {
          setAvailable(true);
        }

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

  const onSave = () => {
    startTransition(() => {
      updateBundle({
        ...bundle,
        description,
        price,
        state: isAvailable ? "available" : "editing",
        products: products.map((product) => ({
          productType: product.productType,
          productId: product.productId
        }))
      } as Bundle).then((res) => {
        if (res) {
          history.push("/admin/bundles");
        } else {
          setServerError(true);
        }
      });
    });
  };

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
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-md">Price</p>
          <Input
            className="w-1/4"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            type="number"
          />
        </div>
        <BundleProducts
          isPending={isPending}
          products={products}
          setProducts={setProducts}
        />
        <div className="flex items-center gap-x-4 -mt-8 mb-4">
          <p className="text-lg">Do you want to make this bundle available?</p>
          <Switch
            checked={isAvailable}
            onCheckedChange={(checked) => setAvailable(checked)}
          />
        </div>
        {isServerError && (
          <FormError message="Internal Server Error occurred while saving this bundle" />
        )}
        <Button
          disabled={isPending}
          className="w-64 flex items-center gap-x-2 rounded-none"
          onClick={onSave}
        >
          <FaSave />
          Save
        </Button>
      </div>
    </div>
  );
}
