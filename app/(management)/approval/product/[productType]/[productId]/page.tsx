"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaDownload, FaRegUser } from "react-icons/fa";
import { Navbar } from "../../../_components/navbar";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { QuestionAlert } from "@/components/utils/question-alert";
import { Product, ProductState } from "@/shared/types/types-product";
import { getProductById } from "@/data/products/product-by-id";
import { getS3ImageLink } from "@/actions/s3/image-link";
import { axiosClient, blobConfig } from "@/lib/axios";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { ProductLink } from "@/shared/types/types-user";
import { ProductHistory } from "@/components/product/product-history";
import { Textarea } from "@/components/ui/textarea";
import { updateProductApproval } from "@/data/products/product-approval-update";

const Bold = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-bold text-xl">{children}</span>;
};

const Thumbnail = (props: {
  path: string;
  focused: boolean;
  onItemSelected: () => void;
}) => {
  return (
    <div
      onMouseEnter={props.onItemSelected}
      className={`w-28 h-16 border-[2px] cursor-pointer ${props.focused && "border-green-700"}`}
    >
      <Avatar
        className={`w-full h-full rounded-none border-[1px] border-white`}
      >
        <AvatarImage src={props.path} className="object-center object-fill" />
        <AvatarFallback className="bg-sky-500">
          <div className="w-full h-full bg-inherit"></div>
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default function ProductDetails({ params }: { params: ProductLink }) {
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();
  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [confirmingTitle, setConfirmingTitle] = useState<string>("");
  const [confirmingMessage, setConfirmingMessage] = useState<string>("");

  const [product, setProduct] = useState<Product>();
  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    let ignore = false; // # to prevent twice loading #
    if (params.productType && params.productId) {
      getProductById(params.productType, params.productId).then((response) => {
        if (!ignore && response) {
          setProduct(response);
          response?.previewList.map((path: string) => {
            getS3ImageLink(path).then((res) => {
              if (res.success) {
                setImageList((prev) => [...prev, res.response as string]);
              }
            });
          });
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [params]);

  const onItemSelected = (index: number) => {
    setSelectedIndex(index);
  };

  const setDownloadFailureConfirming = () => {
    setConfirming(true);
    setConfirmingTitle("Failure");
    setConfirmingMessage(
      "An internal server error occured while tyring to download"
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
      .catch((error) => {
        setDownloadFailureConfirming();
      })
      .catch((error) => {
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
    const history = [...(product?.approval.history || [])];
    const state: ProductState = isApprove ? "approved" : "rejected";
    history.push({
      state,
      comment,
      userId: user?.userId as string
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
  };

  return (
    <div className="w-full flex justify-center py-6">
      <ConfirmAlert
        open={isConfirming}
        title={confirmingTitle}
        message={confirmingMessage}
        onOK={() => setConfirming(false)}
      />
      <div className="w-5/6 flex flex-col gap-y-6">
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
                <p className="text-lg font-medium">{product?.productType}</p>
              </div>
              <div className="w-full flex justify-between">
                <p>Reviews:</p>
                <p className="text-xl text-rose-700">★ ★ ★ ★ ★</p>
              </div>
              <div className="w-full flex justify-between">
                <p>Some More:</p>
                <p>...</p>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <p className="text-lg font-semibold mb-4">About the Product</p>
              <p>{product?.description}</p>
              <p>...</p>
            </div>
            <div className="flex flex-col gap-y-4">
              <Button
                disabled={isPending}
                asChild
                variant="outline"
                className="border-green-700 gap-x-2"
              >
                <Link href={`/creator/${product?.ownerId}`}>
                  <FaRegUser className="text-green-700" />
                  Go to Creator's Profile
                </Link>
              </Button>
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
        <div className="w-full flex flex-col mb-4">
          <p className="text-2xl font-semibold mb-4">Product History</p>
          <ProductHistory history={product?.approval.history || []} />
        </div>
        <div className="w-full flex flex-col gap-y-4">
          <p className="text-2xl font-semibold">Product Approvement</p>
          <div className="flex flex-col gap-y-1">
            <p>Your Comment</p>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-x-4">
            <QuestionAlert
              title="Approve Product"
              message="Are you sure to approve this product?"
              onContinue={() => onCommentProduct(true)}
            >
              <Button disabled={isPending} variant={"default"}>
                Approve
              </Button>
            </QuestionAlert>
            <QuestionAlert
              title="Reject Product"
              message="Are you sure to reject this product?"
              onContinue={() => onCommentProduct(false)}
            >
              <Button disabled={isPending} variant={"destructive"}>
                Reject
              </Button>
            </QuestionAlert>
          </div>
        </div>
      </div>
    </div>
  );
}
