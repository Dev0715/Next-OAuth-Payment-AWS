"use client";

import { getS3ImageLink } from "@/actions/s3/image-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { QustionAlert } from "@/components/utils/question-alert";
import { CartItemType, Product } from "@/shared/product-interface";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PropsParams {
  isPending: boolean,
  product: CartItemType,
  onSelected: (checked: boolean) => void;
  onRemoveItem: () => void;
}

export const CartItem = ({ isPending, product, onSelected, onRemoveItem }: PropsParams) => {
  const [imagePath, setImagePath] = useState<string>("");

  useEffect(() => {
    const s3Link = product.previewList[0];
    getS3ImageLink(s3Link).then(res => {
      if (res.success) {
        setImagePath(res.response as string);
      }
    })
  }, []);

  return (
    <Card className="w-full flex flex-col items-center px-0 rounded-none shadow-md cursor-pointer hover:drop-shadow-lg hover:bg-gray-100 hover:translate-x-[-1px] hover:translate-y-[-1px]">
      <CardContent className="w-full p-0 flex gap-y-4">
        <Avatar className="w-72 h-48 rounded-none">
          <AvatarImage
            src={imagePath}
            className="object-fill aspect-auto"
          />
          <AvatarFallback className="bg-sky-500">
            <div className="w-full h-full bg-green-700"></div>
          </AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col justify-between p-4">
          <div className="flex flex-col gap-y-2">
            <p>{product.title}</p>
            <p className="text-base text-black">Price: ${product.price}</p>
            <p className="text-base text-gray-700 drop-shadow-md">{product.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <QustionAlert title="Warning" message="Are you sure to remove this product from your cart?" onContinue={onRemoveItem}>
              <Button
                disabled={isPending}
                variant={"outline"}
                className="border-red-700"
              >
                Remove
              </Button>
            </QustionAlert>
            <Switch
              disabled={isPending}
              className="h-3/4"
              checked={product.selected}
              onCheckedChange={onSelected}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
