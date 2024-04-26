"use client";

import { getS3ImageLink } from "@/actions/s3/image-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Product, ProductState } from "@/shared/types/types-product";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PropsParams {
  product: Product;
  _url?: string;
}

export const ProductItem = ({ product, _url }: PropsParams) => {
  const [imagePath, setImagePath] = useState<string>("");

  useEffect(() => {
    const s3Link = product.previewList[0];
    getS3ImageLink(s3Link).then((res) => {
      if (res.success) {
        setImagePath(res.response as string);
      }
    });
  }, []);

  const stateText = () => {
    const _state: ProductState = product.approval.state;
    if (_state === "created") {
      return "Created, waiting for approval";
    } else if (_state === "approved") {
      return "Approved";
    } else if (_state === "rejected") {
      return "Rejected";
    } else if (_state === "updated") {
      return "Updated, waiting for approval";
    }
  };

  const stateClassName = () => {
    const _state: ProductState = product.approval.state;
    if (_state === "created") {
      return "text-white";
    } else if (_state === "approved") {
      return "text-green-500 font-semibold";
    } else if (_state === "rejected") {
      return "text-red-400 font-semibold";
    } else if (_state === "updated") {
      return "text-white";
    }
  };

  return (
    <Link
      href={`${_url ? _url : "/products/details"}/${product.productType}/${product.productId}`}
      className="w-full"
    >
      <Card className="relative w-full flex flex-col items-center px-0 rounded-none shadow-md cursor-pointer hover:drop-shadow-lg hover:bg-gray-100 hover:translate-x-[-1px] hover:translate-y-[-1px]">
        <div className="absolute top-2 right-2 z-10">
          <p
            className={`text-sm px-2 bg-black/40 rounded-full ${stateClassName()}`}
          >
            {stateText()}
          </p>
        </div>
        <CardContent className="w-full p-0 flex flex-col gap-y-4">
          <Avatar className="w-full h-56 rounded-none">
            <AvatarImage src={imagePath} className="object-fill aspect-auto" />
            <AvatarFallback className="bg-sky-500">
              <div className="w-full h-full bg-green-700"></div>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col px-4 pb-4">
            <div className="flex gap-4">
              <p>{product.title}</p>
              <p className="text-base text-black">Price: ${product.price}</p>
            </div>
            <p className="text-base text-gray-700 drop-shadow-md">
              {product.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
