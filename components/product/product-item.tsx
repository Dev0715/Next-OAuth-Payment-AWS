"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import type { Product, ProductState } from "@/shared/types/product.type";
import { useAtom } from "jotai";
import { s3LinkAtom } from "@/store/s3-link";
import { useLinkFromS3 } from "@/hooks/use-link-from-s3";

interface PropsParams {
  product: Product;
  _url?: string;
  noBadge?: boolean;
}

export const ProductItem = ({ product, _url, noBadge }: PropsParams) => {
  const [imagePath, setImagePath] = useState<string>("");
  const { getLinkFromS3 } = useLinkFromS3();

  useEffect(() => {
    if (!product) return;

    const s3Path = product.previewList[0];
    getLinkFromS3(s3Path).then((res) => {
      if (res.success) {
        setImagePath(res.response as string);
      }
    });
  }, [product]);

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
      href={`${_url ? _url : "/products"}/${product.productType}/${product.productId}`}
      className="w-full"
    >
      <Card className="relative w-full flex flex-col items-center px-0 rounded-none shadow-md cursor-pointer hover:drop-shadow-lg hover:bg-gray-100 hover:translate-x-[-1px] hover:translate-y-[-1px]">
        {!noBadge && (
          <div className="absolute top-2 right-2 z-10">
            <p
              className={`text-sm px-2 bg-black/40 rounded-full ${stateClassName()}`}
            >
              {stateText()}
            </p>
          </div>
        )}
        <CardContent className="w-full p-0 flex flex-col gap-y-4">
          <Avatar className="w-full h-56 rounded-none">
            <AvatarImage src={imagePath} className="object-fill aspect-auto" />
            <AvatarFallback className="bg-transparent">
              <div className="w-full h-full bg-transparent"></div>
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
