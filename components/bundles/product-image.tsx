import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLinkFromS3 } from "@/hooks/use-link-from-s3";
import { Product } from "@/shared/types/product.type";

type Props = {
  product: Product;
};

export const ProductImage = ({ product }: Props) => {
  const [image, setImage] = useState<string>("");
  const { getLinkFromS3 } = useLinkFromS3();

  useEffect(() => {
    if (!product.previewList || !getLinkFromS3) return;

    getLinkFromS3(product.previewList[0], "LISTING").then((res) => {
      if (res.success) {
        setImage(res.response as string);
      }
    });
  }, [product.previewList, getLinkFromS3]);

  return (
    <Avatar className="w-72 h-48 rounded-xl">
      <AvatarImage src={image} className="object-cover" />
      <AvatarFallback className="bg-sky-500">
        <div className="w-full h-full bg-inherit"></div>
      </AvatarFallback>
    </Avatar>
  );
};
