import { FaPlus } from "react-icons/fa"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { ProductItem } from "./productitem"
import Link from "next/link"

export const UserCollection = () => {
  return (
    <Card className="border-0 rounded-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-xl font-bold">Your Collections</p>
        <Button variant="default" asChild className="flex gap-x-1">
          <Link href="/">
            <FaPlus /> Add
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-6">
        {[...Array(23)].map(item => (
          <ProductItem key={item} imgPath="" title="" description="" price={5} />
        ))}
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>)
}