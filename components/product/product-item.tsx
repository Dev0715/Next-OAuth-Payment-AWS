"use client";

import { getS3ImageLink } from "@/actions/s3/image-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Product } from "@/shared/product-interface";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PropsParams {
  product: Product
}

export const ProductItem = ({ product }: PropsParams) => {
  // const tempImagePath = ["/profile-back-example.jpg", "/product-example.jpg", "/product-example-2.jpg"];
  const [imagePath, setImagePath] = useState<string>("");

  useEffect(() => {
    const s3Link = product?.imageList[0];
    getS3ImageLink(s3Link).then(res => {
      if (res.success) {
        setImagePath(res.response as string);
      }
    })
  }, []);

  return (
    <Link href={`/products/details/${product?.productId}`} className="w-full">
      <Card className="w-full flex flex-col items-center px-0 rounded-none shadow-md cursor-pointer hover:drop-shadow-lg hover:bg-gray-100 hover:translate-x-[-1px] hover:translate-y-[-1px]">
        <CardContent className="w-full p-0 flex flex-col gap-y-4">
          <Avatar className="w-full h-56 rounded-none">
            <AvatarImage src={imagePath} />
            {/* <AvatarImage
              src={tempImagePath[Math.floor(Math.random() * 100) % 3]}
              className="object-fill aspect-auto"
            /> */}
            <AvatarFallback className="bg-sky-500">
              <div className="w-full h-full bg-green-700"></div>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col px-4 pb-4">
            <div className="flex gap-4">
              <p>{product?.title}</p>
              <p className="text-md text-gray-600">Price: ${product?.price}</p>
            </div>
            <p className="text-lg text-black drop-shadow-md">{product?.description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
