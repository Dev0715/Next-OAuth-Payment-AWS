import { Bundle } from "@/shared/types/bundles.type";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useEffect, useState } from "react";
import { Product } from "@/shared/types/product.type";
import { getProductById } from "@/data/product";
import { ProductImage } from "./product-image";
import Link from "next/link";

type Props = {
  bundle: Bundle;
};

export const BundleItem = ({ bundle }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (bundle.products) {
      Promise.all(
        bundle.products.map(async (productLink) => {
          return await getProductById(
            productLink.productType,
            productLink.productId
          );
        })
      ).then((_products) => {
        setProducts(
          _products.filter((_product) => _product !== null) as Product[]
        );
      });
    }
  }, []);

  return (
    <Link href={`/bundles/${bundle.bundleId}`} passHref>
      <Card className="w-full pr-6 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:drop-shadow transition all ease-out cursor-pointer">
        <CardHeader>
          <div className="flex gap-x-4">
            <p>{bundle.title} </p>
            <strong>
              ( {bundle.products?.length} / ${bundle.price} )
            </strong>
          </div>
        </CardHeader>
        <CardContent className="max-w-full w-full flex gap-x-4 overflow-hidden">
          {products.map((product, index) =>
            index < 3 ? (
              <div key={product.productId} className="flex">
                <ProductImage product={product} />
              </div>
            ) : null
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
