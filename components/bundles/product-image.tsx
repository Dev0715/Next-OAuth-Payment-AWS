import { getLinkFromS3 } from "@/actions/s3/link-from-s3";
import { Product } from "@/shared/types/product.type";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  product: Product;
};

export const ProductImage = ({ product }: Props) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    getLinkFromS3(product.previewList[0]).then((res) => {
      if (res.success) {
        setImage(res.response as string);
      }
    });
  }, []);

  return (
    <Avatar className="w-72 h-48 rounded-xl">
      <AvatarImage src={image} className="object-cover" />
      <AvatarFallback className="bg-sky-500">
        <div className="w-full h-full bg-inherit"></div>
      </AvatarFallback>
    </Avatar>
  );
};
