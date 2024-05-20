"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaDownload, FaRegUser } from "react-icons/fa";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import { axiosClient, blobConfig } from "@/lib/axios";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { ProductHistory } from "@/components/product/product-history";
import { getProductById, updateProductApproval } from "@/data/product";
import { Navbar } from "../../../_components/navbar";
import Link from "next/link";

import type {
  Product,
  ProductLink,
  ProductState
} from "@/shared/types/product.type";
import { useLinkFromS3 } from "@/hooks/use-link-from-s3";
import { Card } from "@/components/ui/card";
import { ProductApprovement } from "@/components/admin/product-approvement";
import { Thumbnail } from "@/components/product/thumbnail";

const Bold = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-bold text-xl">{children}</span>;
};

export default function ProductDetails({ params }: { params: ProductLink }) {
  const [user] = useAtom(userAtom);
  const { getLinkFromS3 } = useLinkFromS3();

  const [isPending, startTransition] = useTransition();
  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [confirmingTitle, setConfirmingTitle] = useState<string>("");
  const [confirmingMessage, setConfirmingMessage] = useState<string>("");

  const [product, setProduct] = useState<Product>();
  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (params.productType && params.productId) {
      getProductById(params.productType, params.productId).then((_product) => {
        if (_product) {
          setProduct(_product);
          _product?.previewList.map((path: string) => {
            getLinkFromS3(path).then((res) => {
              if (res.success) {
                setImageList((prev) => [...prev, res.response as string]);
              }
            });
          });
        }
      });
    }
  }, [params]);

  const onItemSelected = (index: number) => {
    setSelectedIndex(index);
  };

  const setDownloadFailureConfirming = () => {
    setConfirming(true);
    setConfirmingTitle("Failure");
    setConfirmingMessage(
      "An internal server error occurred while trying to download"
    );
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
        setDownloadFailureConfirming();
      })
      .catch(() => {
        setDownloadFailureConfirming();
      });

    // fetch('/api/download').then(response => response.blob()).then(blob => { ... })
  };

  const checkComment = () => {
    if (comment.length < 10) {
      setConfirming(true);
      setConfirmingTitle("Comment too short");
      setConfirmingMessage(
        "Please write a comment with at least 10 characters"
      );
      return false;
    }
    return true;
  };

  const onCommentProduct = (isApprove: boolean) => {
    if (!checkComment()) {
      return;
    }

    startTransition(() => {
      const history = [...(product?.approval.history || [])];
      const state: ProductState = isApprove ? "approved" : "rejected";
      history.push({
        state,
        comment,
        userId: user?.userId as string,
        time: new Date().toISOString()
      });
      const approval = { state, history };
      updateProductApproval({
        productType: params.productType,
        productId: params.productId,
        approval
      }).then((res) => {
        if (res) {
          setProduct((prev) => {
            if (prev) {
              return { ...prev, approval };
            }
            return prev;
          });
        }
        setComment("");
      });
    });
  };

  if (!product) return;

  return (
    <div className="w-full flex flex-col gap-y-8">
      <ConfirmAlert
        open={isConfirming}
        title={confirmingTitle}
        message={confirmingMessage}
        onOK={() => setConfirming(false)}
      />
      <Navbar
        title={`Approval for Product - ${product?.title}`}
        content="You can check the details of product and approve it"
      />
      <div className="w-full flex gap-x-8">
        <div className="w-3/4 flex flex-col gap-y-4">
          <Avatar className="w-full h-[480px] rounded-none">
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
              <Button
                disabled={isPending}
                variant="outline"
                className="w-full border-green-700 gap-x-2"
              >
                <FaRegUser className="text-green-700" />
                {`Go to Creator's Profile`}
              </Button>
            </Link>
            <Button
              disabled={isPending}
              onClick={onDownloadCreativeFiles}
              variant="outline"
              className="w-full border-green-700 gap-x-2"
            >
              <FaDownload className="text-green-700" />
              Download Creative Files
            </Button>
          </div>
        </div>
      </div>
      <Card className="p-6 rounded-none">
        <div className="w-full flex flex-col gap-y-4">
          <p className="text-2xl font-semibold">Product History</p>
          <ProductHistory history={product?.approval.history || []} />
        </div>
      </Card>
      <ProductApprovement
        isPending={isPending}
        comment={comment}
        setComment={setComment}
        onCommentProduct={onCommentProduct}
      />
    </div>
  );
}
