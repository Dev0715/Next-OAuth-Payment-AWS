"use client";

import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { AiFillCreditCard } from "react-icons/ai";
import { FaCartArrowDown, FaDownload, FaRegUser } from "react-icons/fa";

import { captureOrder as capturePaypalOrder } from "@/actions/paypal/capture-order";
import { addProductToCart } from "@/actions/user/add-product-to-cart";
import { addProductToPurchased } from "@/actions/user/add-product-to-purchased";
import { PaymentButton } from "@/components/payment/payment-button";
import { Thumbnail } from "@/components/product/thumbnail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { GradientButton } from "@/components/utils/gradient-button";

import { QuestionAlert } from "@/components/utils/question-alert";
import { getProductById } from "@/data/product";
import { useLinkFromS3 } from "@/hooks/use-link-from-s3";
import { axiosClient, blobConfig } from "@/lib/axios";
import { cartAtom } from "@/store/cart";
import { orderListAtom } from "@/store/orderList";
import { userAtom } from "@/store/user";

import { Navbar } from "../../_components/navbar";

import type { Product, ProductLink } from "@/shared/types/product.type";

const Bold = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-bold text-xl">{children}</span>;
};

export default function ProductDetails({ params }: { params: ProductLink }) {
  const Gateway_Paypal = "paypal";
  const Gateway_Stripe = "stripe";
  const Gateway_Cancelled = "cancelled";

  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const [user] = useAtom(userAtom);
  const { getLinkFromS3 } = useLinkFromS3();

  const [isPending, startTransition] = useTransition();
  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [confirmingTitle, setConfirmingTitle] = useState<string>("");
  const [confirmingMessage, setConfirmingMessage] = useState<string>("");

  const [product, setProduct] = useState<Product>();
  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [cart, setCart] = useAtom(cartAtom);
  const [, setOrderList] = useAtom(orderListAtom);

  useEffect(() => {
    if (!getLinkFromS3) return;
    let ignore = false; // # to prevent twice loading #

    if (params.productType && params.productId) {
      getProductById(params.productType, params.productId).then((response) => {
        if (!ignore && response) {
          setProduct(response);
          response?.previewList.map((path: string) => {
            getLinkFromS3(path, "LISTING").then((res) => {
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
  }, [params, getLinkFromS3]);

  const onItemSelected = (index: number) => {
    setSelectedIndex(index);
  };

  const setPurchasedConfirming = (success: boolean) => {
    setConfirming(true);
    if (success) {
      setConfirmingTitle("Success");
      setConfirmingMessage("This product was purchased successfully");
    } else {
      setConfirmingTitle("Failure");
      setConfirmingMessage("Payment for this product was cancelled");
    }
  };

  const setPurchasedErrorConfirming = () => {
    setConfirming(true);
    setConfirmingTitle("Failure");
    setConfirmingMessage("Internal server error occurred while purchasing");
  };

  const onProductPurchased = () => {
    addProductToPurchased({
      userId: user?.userId as string,
      products: [
        {
          productType: params.productType,
          productId: params.productId
        }
      ]
    })
      .then((res) => {
        if (res.success) {
          setPurchasedConfirming(true);
        } else {
          setPurchasedErrorConfirming();
        }
      })
      .catch(() => {
        setPurchasedErrorConfirming();
      });
  };

  useEffect(() => {
    const gateway = searchParams.get("gateway");
    if (gateway === Gateway_Paypal) {
      const paymentId = String(searchParams.get("token"));
      // const payerId = searchParams.get("PayerID");
      capturePaypalOrder({ paymentId });
      onProductPurchased();
    } else if (gateway === Gateway_Stripe) {
      // const paymentId = String(searchParams.get("session_id"));
      // const payerId = 0;
      // captureStripeOrder({ paymentId });
      onProductPurchased();
    } else if (gateway === Gateway_Cancelled) {
      setPurchasedConfirming(false);
    }
    window.history.replaceState(null, "", currentPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const setCartConfirming = (success: boolean, message?: string) => {
    setConfirming(true);
    if (success) {
      setConfirmingTitle("Success");
      setConfirmingMessage("1 product was moved to your cart successfully");
    } else {
      setConfirmingTitle("Failure");
      setConfirmingMessage(
        message || "An error occurred while moving product to your cart"
      );
    }
  };

  const onConfirmCart = () => {
    startTransition(() => {
      if (!product) return;

      const newProductLink = {
        productType: product.productType,
        productId: product.productId
      };

      addProductToCart({
        userId: user?.userId as string,
        product: newProductLink
      })
        .then((res) => {
          if (res.success) {
            if (!cart) {
              setCart([newProductLink]);
            } else {
              setCart([...cart, newProductLink]);
            }
            setCartConfirming(true);
          } else {
            setCartConfirming(false, res.error);
          }
        })
        .catch(() => {
          setCartConfirming(false);
        });
    });
  };

  const setDownloadFailureConfirming = () => {
    setConfirming(true);
    setConfirmingTitle("Failure");
    setConfirmingMessage(
      "An internal server error occurred while trying to download"
    );
  };

  const onDownloadCreativeFiles = () => {
    // fetch('/api/download').then(response => response.blob()).then(blob => {
    //   const link = document.createElement('a');
    //   link.download = 'creative-work.zip';
    //   link.href = URL.createObjectURL(blob);
    //   link.click();
    // })

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
          title="Product Detail"
          content="You can see details of product"
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
            <div className="flex flex-col gap-y-4">
              <GradientButton disabled={isPending} asChild className="gap-x-2">
                <Link href={`/creator/${product?.ownerId}`}>
                  <FaRegUser className="text-white" />
                  {`Go to Creator's Profile`}
                </Link>
              </GradientButton>
              <QuestionAlert
                title="Confirmation"
                message="Are you sure to move this product to your cart?"
                onContinue={onConfirmCart}
                onCancel={() => {}}
              >
                <GradientButton disabled={isPending} className="w-full gap-x-2">
                  <FaCartArrowDown className="text-white" />
                  Add to cart
                </GradientButton>
              </QuestionAlert>
              <PaymentButton disabled={isPending} mode="modal">
                <GradientButton
                  onClick={() => {
                    setOrderList(product ? [product] : []);
                  }}
                  variant="default"
                  className="w-full flex gap-x-2"
                >
                  <AiFillCreditCard />
                  Purchase
                </GradientButton>
              </PaymentButton>
              <GradientButton
                disabled={isPending}
                onClick={onDownloadCreativeFiles}
                variant="outline"
                className="w-full gap-x-2"
              >
                <FaDownload className="text-white" />
                Download
              </GradientButton>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col pt-2">
          <p className="text-2xl font-bold mb-4">About the Product</p>
          <p>{product?.description}</p>
          <p>...</p>
        </div>
      </div>
    </div>
  );
}
