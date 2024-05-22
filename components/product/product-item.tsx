"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useLinkFromS3 } from "@/hooks/use-link-from-s3";

import type { Product, ProductState } from "@/shared/types/product.type";

const ClassName_Text: Record<ProductState, string> = {
  created: "text-green-700 font-semibold bg-white",
  updated: "text-blue-700 font-semibold bg-white",
  submitted: "text-white bg-blue-700",
  resubmitted: "text-yellow-200 bg-green-700",
  approved: "text-green-400 font-semibold bg-black/100",
  rejected: "text-red-400 font-semibold bg-black/100",
  applied: "text-yellow-400 font-semibold bg-black/100",
  published: "text-green-400 font-semibold bg-black/100"
};

const DisplayName_Text: Record<ProductState, string> = {
  created: "Created",
  updated: "Updated",
  submitted: "Submitted",
  resubmitted: "Resubmitted",
  approved: "Approved",
  rejected: "Rejected",
  applied: "Applied",
  published: "Published"
};

type PropsParams = {
  product: Product;
  _url?: string;
  noBadge?: boolean;
};

export const ProductItem = ({ product, _url, noBadge }: PropsParams) => {
  const [imagePath, setImagePath] = useState<string>("");
  const { getLinkFromS3 } = useLinkFromS3();

  const stateClassName = ClassName_Text[product.approval.state];
  const stateText = DisplayName_Text[product.approval.state];

  useEffect(() => {
    if (!product || !getLinkFromS3) return;

    const s3Path = product.previewList[0];
    getLinkFromS3(s3Path).then((res) => {
      if (res.success) {
        setImagePath(res.response as string);
      }
    });
  }, [product, getLinkFromS3]);

  return (
    <Link
      href={`${_url ? _url : "/products"}/${product.productType}/${product.productId}`}
      className="w-full"
    >
      <Card className="relative w-full flex flex-col items-center px-0 rounded-none shadow-md cursor-pointer hover:drop-shadow-lg hover:bg-gray-100 hover:translate-x-[-1px] hover:translate-y-[-1px]">
        {!noBadge && (
          <div className="absolute top-2 right-2 z-10">
            <p
              className={`text-sm px-2 bg-black/40 rounded-full ${stateClassName}`}
            >
              {stateText}
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
