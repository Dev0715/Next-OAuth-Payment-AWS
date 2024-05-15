"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaDownload, FaRegUser } from "react-icons/fa";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import { QuestionAlert } from "@/components/utils/question-alert";
import { getLinkFromS3 } from "@/actions/s3/link-from-s3";
import { axiosClient, blobConfig } from "@/lib/axios";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { ProductHistory } from "@/components/product/product-history";
import { Textarea } from "@/components/ui/textarea";
import { getProductById, updateProductApproval } from "@/data/product";
import { Navbar } from "../../../_components/navbar";
import Link from "next/link";

import type {
  Product,
  ProductLink,
  ProductState
} from "@/shared/types/product.type";
import { s3LinkAtom } from "@/store/s3-link";

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
  const [user] = useAtom(userAtom);
  const [s3Link, setS3Link] = useAtom(s3LinkAtom);

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
            getLinkFromS3(path, s3Link, setS3Link).then((res) => {
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
    });
  };

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
      <div className="w-full flex flex-col gap-y-4">
        <p className="text-2xl font-semibold">Product History</p>
        <ProductHistory history={product?.approval.history || []} />
      </div>
      <div className="w-full flex flex-col gap-y-4">
        <p className="text-2xl font-semibold">Product Approvement</p>
        <div className="flex flex-col gap-y-1">
          <p>Your Comment</p>
          <Textarea
            disabled={isPending}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-1/2"
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
  );
}
