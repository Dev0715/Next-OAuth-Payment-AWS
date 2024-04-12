import { FaPlus } from "react-icons/fa"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { ProductItem } from "../product/product-item"
import Link from "next/link"

export const UserCollection = () => {
  return (
    <Card className="border-0 rounded-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-xl font-bold">Your Collections</p>
        <Button variant="default" asChild className="w-48 flex gap-x-2">
          <Link href="/products/new">
            <FaPlus /> Add
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex flex-wrap">
        {[...Array(23)].map((item, index) => (
          <div className="w-1/4 p-4">
            <ProductItem key={index} imgPath="" title="" description="" price={5} />
          </div>
        ))}
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>)
}