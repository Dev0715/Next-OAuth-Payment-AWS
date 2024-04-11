"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { FaFaucet, FaProductHunt, FaShoppingBasket } from "react-icons/fa";

interface PropsParams {
  imgPath: string;
  title: string;
  description: string;
  price: number
}

export const ProductItem = ({ imgPath, title, description, price }: PropsParams) => {
  const tempImagePath = ["/profile-back-example.jpg", "/product-example.jpg", "/product-example-2.jpg"];
  return (
    <Link href={`/products/details/${title}`} className="w-full">
      <Card className="w-full flex flex-col items-center px-0 rounded-none shadow-md cursor-pointer hover:drop-shadow-lg hover:bg-gray-100 hover:translate-x-[-1px] hover:translate-y-[-1px]">
        <CardContent className="w-full p-0 flex flex-col gap-y-4">
          <Avatar className="w-full h-56 rounded-none">
            {/* <AvatarImage src={imgPath} /> */}
            <AvatarImage src={tempImagePath[Math.floor(Math.random() * 100) % 3]} />
            <AvatarFallback className="bg-sky-500">
              <div className="w-full h-full bg-green-700"></div>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col px-4 pb-4">
            <div className="flex gap-4">
              <p>{title}</p>
              <p className="text-md text-gray-600">Price: ${price}</p>
            </div>
            <p className="text-lg text-black drop-shadow-md">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
