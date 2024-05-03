import { getLinkFromS3 } from "@/actions/s3/link-from-s3";
import { Product } from "@/shared/types/product.type";
import { useEffect, useState } from "react";

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
};
