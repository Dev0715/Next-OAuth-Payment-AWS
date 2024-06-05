import { useAtom } from "jotai";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Product } from "@/shared/types/product.type";
import { userAtom } from "@/store/user";

import { ProductItem } from "../product/product-item";
import { GradientButton } from "../utils/gradient-button";
import { GradientParagraph } from "../utils/gradient-paragraph";

type Props = {
  products: Product[];
  userId: string;
};

export const UserCollection = ({ products, userId }: Props) => {
  const [user] = useAtom(userAtom);

  return (
    <Card className="border-0 rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <GradientParagraph className="text-xl font-bold">
          Your Collections
        </GradientParagraph>
        {user?.userId === userId && (
          <GradientButton
            variant="default"
            asChild
            className="w-48 flex gap-x-2"
          >
            <Link href="/creator/new-product">
              <FaPlus /> Add
            </Link>
          </GradientButton>
        )}
      </CardHeader>
      <CardContent className="flex flex-wrap">
        {products.map((product, index) => (
          <div key={product.productId} className="w-1/4 p-4">
            <ProductItem
              key={index}
              product={product}
              _url={`/creator/edit-product`}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
