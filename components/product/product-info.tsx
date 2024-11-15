import Link from "next/link";
import { useEffect, useState } from "react";
import { FaDownload, FaRegUser } from "react-icons/fa";

import { Thumbnail } from "@/components/product/thumbnail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { getProductById } from "@/data/product";
import { useLinkFromS3 } from "@/hooks/use-link-from-s3";
import { axiosClient, blobConfig } from "@/lib/axios";

import { Product } from "@/shared/types/product.type";

import { GradientButton } from "../utils/gradient-button";

const Bold = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-bold text-xl">{children}</span>;
};

type Props = {
  product: Product;
  isPending: boolean;
};

export const ProductInfo = ({ product, isPending }: Props) => {
  const { getLinkFromS3 } = useLinkFromS3();
  const { toast } = useToast();

  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (product.productType && product.productId) {
      getProductById(product.productType, product.productId).then(
        (_product) => {
          if (_product) {
            _product?.previewList.map((path: string) => {
              getLinkFromS3(path, "LISTING").then((res) => {
                if (res.success) {
                  setImageList((prev) => [...prev, res.response as string]);
                }
              });
            });
          }
        }
      );
    }
  }, [product]);

  const onItemSelected = (index: number) => {
    setSelectedIndex(index);
  };

  const onDownloadCreativeFiles = () => {
    axiosClient
      .post("/download", { fileList: product?.fileList }, blobConfig)
      .then((response) => response.data)
      .then((blob) => {
        const link = document.createElement("a");
        link.download = `${product?.title}.zip`;
        link.href = URL.createObjectURL(blob);
        link.click();
      })
      .catch(() => {
        toast({
          title: "Failed to download the creative files",
          variant: "destructive"
        });
      })
      .finally(() => {});

    // fetch('/api/download').then(response => response.blob()).then(blob => { ... })
  };

  return (
    <div className="w-full flex gap-x-8">
      <div className="w-3/4 flex flex-col gap-y-4">
        <Avatar className="w-full h-[480px]">
          <AvatarImage
            src={imageList[selectedIndex]}
            className="object-cover"
          />
          <AvatarFallback className="bg-sky-500">
            <div className="w-full h-full bg-inherit"></div>
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-x-4">
          {imageList.map((path, index) => (
            <Thumbnail
              key={index}
              path={path}
              focused={index === selectedIndex}
              onItemSelected={() => onItemSelected(index)}
            />
          ))}
        </div>
      </div>
      <div className="w-1/4 flex flex-col gap-y-12">
        <div className="w-full flex flex-col gap-y-4">
          <div className="w-full flex justify-between">
            <p>Price:</p>
            <Bold>${product?.price}</Bold>
          </div>
          <div className="w-full flex justify-between">
            <p>Categories:</p>
            <p className="text-lg font-medium">
              {product?.productType as unknown as string}
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p>Creator:</p>
            <p className="text-lg font-medium">{product?.ownerId}</p>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <p className="text-lg font-semibold mb-4">About the Product</p>
          <p>{product?.description}</p>
          <p>...</p>
        </div>
        <div className="flex flex-col gap-y-4">
          <Link href={`/creator/${product?.ownerId}`}>
            <GradientButton
              disabled={isPending}
              className="w-full border-green-700 gap-x-2"
            >
              <FaRegUser className="text-white" />
              {`Go to Creator's Profile`}
            </GradientButton>
          </Link>
          <GradientButton
            disabled={isPending}
            onClick={onDownloadCreativeFiles}
            className="w-full border-green-700 gap-x-2"
          >
            <FaDownload className="text-white" />
            Download Creative Files
          </GradientButton>
        </div>
      </div>
    </div>
  );
};
