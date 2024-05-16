import { getLinkFromS3 } from "@/actions/s3/link-from-s3";
import { Product } from "@/shared/types/product.type";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAtom } from "jotai";
import { s3LinkAtom } from "@/store/s3-link";

type Props = {
  product: Product;
};

export const ProductImage = ({ product }: Props) => {
  const [image, setImage] = useState<string>("");
  const [s3Link, setS3Link] = useAtom(s3LinkAtom);

  useEffect(() => {
    if (!product.previewList || !s3Link || !setS3Link) return;

    getLinkFromS3(product.previewList[0], s3Link, setS3Link).then((res) => {
      if (res.success) {
        setImage(res.response as string);
      }
    });
  }, [product.previewList, s3Link, setS3Link]);

  return (
    <Avatar className="w-72 h-48 rounded-xl">
      <AvatarImage src={image} className="object-cover" />
      <AvatarFallback className="bg-sky-500">
        <div className="w-full h-full bg-inherit"></div>
      </AvatarFallback>
    </Avatar>
  );
};
