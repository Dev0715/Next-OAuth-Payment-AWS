"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { QuestionAlert } from "@/components/utils/question-alert";
import { useLinkFromS3 } from "@/hooks/use-link-from-s3";

import type { CartProduct } from "@/shared/types/product.type";

interface PropsParams {
  isPending: boolean;
  product: CartProduct;
  onSelected: (checked: boolean) => void;
  onRemoveItem: () => void;
}

export const CartItem = ({
  isPending,
  product,
  onSelected,
  onRemoveItem
}: PropsParams) => {
  const [imagePath, setImagePath] = useState<string>("");
  const { getLinkFromS3 } = useLinkFromS3();

  useEffect(() => {
    if (!product.previewList) return;

    const _s3Link = product.previewList[0];
    getLinkFromS3(_s3Link).then((res) => {
      if (res.success) {
        setImagePath(res.response as string);
      }
    });
  }, [product.previewList, getLinkFromS3]);

  return (
    <Card className="w-full flex flex-col items-center px-0 rounded-none shadow-md cursor-pointer hover:drop-shadow-lg hover:bg-gray-100">
      <CardContent className="w-full p-0 flex gap-y-4">
        <Avatar className="w-72 h-48 rounded-none">
          <AvatarImage src={imagePath} className="object-fill aspect-auto" />
          <AvatarFallback className="bg-sky-500">
            <div className="w-full h-full bg-green-700"></div>
          </AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col justify-between p-4">
          <div className="flex flex-col gap-y-2">
            <p>{product.title}</p>
            <p className="text-base text-black">Price: ${product.price}</p>
            <p className="text-base text-gray-700 drop-shadow-md">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-6">
              <Button
                asChild
                disabled={isPending}
                variant={"link"}
                className="p-0"
              >
                <Link
                  href={`/products/details/${product.productType}/${product.productId}`}
                  className="w-full"
                >
                  Details
                </Link>
              </Button>
              <QuestionAlert
                title="Warning"
                message="Are you sure to remove this product from your cart?"
                onContinue={onRemoveItem}
              >
                <Button
                  disabled={isPending}
                  variant={"link"}
                  className="p-0 text-red-700"
                >
                  Remove
                </Button>
              </QuestionAlert>
            </div>
            <Switch
              disabled={isPending}
              checked={product.selected}
              onCheckedChange={onSelected}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
