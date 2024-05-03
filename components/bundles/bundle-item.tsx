import { Bundle } from "@/shared/types/bundles.type";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useEffect, useState } from "react";
import { Product } from "@/shared/types/product.type";
import { getProductById } from "@/data/products/product-by-id";

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
    <Card className="w-full hover:-translate-x-[2px] hover:-translate-y-[2px] hover:drop-shadow transition all ease-out">
      <CardHeader>{bundle.title}</CardHeader>
      <CardContent className="max-w-full w-full">
        {products.map((product, index) =>
          index < 4 ? <div className="flex">Something</div> : null
        )}
      </CardContent>
    </Card>
  );
};
