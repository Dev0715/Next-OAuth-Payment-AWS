import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ProductItem } from "../product/product-item";
import Link from "next/link";
import { Product } from "@/shared/types/product.type";
import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {
  products: Product[];
  userId: string;
};

export const UserCollection = ({ products, userId }: Props) => {
  const signedUser = useCurrentUser();

  return (
    <Card className="border-0 rounded-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-xl font-bold">Your Collections</p>
        {signedUser?.userId === userId && (
          <Button variant="default" asChild className="w-48 flex gap-x-2">
            <Link href="/products/new">
              <FaPlus /> Add
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-wrap">
        {products.map((product, index) => (
          <div key={product.productId} className="w-1/4 p-4">
            <ProductItem key={index} product={product} />
          </div>
        ))}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
