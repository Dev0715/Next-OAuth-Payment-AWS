import { FaPlus } from "react-icons/fa"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { ProductItem } from "../product/product-item"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Product } from "@/shared/product-interface"
import { Creator } from "@/shared/user-interface"
import { getProductById } from "@/data/products/product-by-id"
import { useCurrentUser } from "@/hooks/use-current-user"
import { getUserById } from "@/data/user/user-by-id"

type ProductLink = {
  productType: string;
  productId: string;
}

export const UserCollection = ({ userId }: { userId: string }) => {
  const signedUser = useCurrentUser();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let ignore = false;
    getUserById(userId).then(user => {
      if (!ignore) {
        user?.products.map((item: ProductLink) => {

        })
      }
    })
    return () => {
      ignore = true;
    }
  }, [userId]);

  return (
    <Card className="border-0 rounded-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-xl font-bold">Your Collections</p>
        {signedUser?.id === userId && (
          <Button variant="default" asChild className="w-48 flex gap-x-2">
            <Link href="/products/new">
              <FaPlus /> Add
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-wrap">
        {products.map((product, index) => (
          <div className="w-1/4 p-4">
            <ProductItem key={index} product={product} />
          </div>
        ))}
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>)
}