"use client"

import { PaymentButton } from "@/components/payment/payment-button";
import { WrappedButton } from "@/components/utils/wrapped-button";
import { AiFillCreditCard } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCartArrowDown, FaDownload, FaRegUser } from "react-icons/fa";
import { Navbar } from "../../../_components/navbar";
import { usePathname, useSearchParams } from "next/navigation";
import { captureOrder as captureStripeOrder } from '@/actions/stripe/capture-order';
import { captureOrder as capturePaypalOrder } from "@/actions/paypal/capture-order";
import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { QustionAlert } from "@/components/utils/question-alert";
import { Product } from "@/shared/types-product";
import { getProductById } from "@/data/products/product-by-id";
import { getS3ImageLink } from "@/actions/s3/image-link";
import { axiosClient, axiosConfig, blobConfig } from "@/lib/axios";
import { addProductToCart } from "@/actions/user/add-product-to-cart";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { useAtom } from "jotai";
import { cartAtom } from "@/store/cart";
import { ProductLink } from "@/shared/types-user";
import { orderListAtom } from "@/store/orderList";
import { addProductToPurchased } from "@/actions/user/add-product-to-purchased";

const Bold = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="font-bold text-xl">
      {children}
    </span>
  )
}

const Thumbnail = (props: {
  path: string,
  focused: boolean,
  onItemSelected: () => void
}) => {
  return (
    <div
      onMouseEnter={props.onItemSelected}
      className={`w-28 h-16 border-[2px] cursor-pointer ${props.focused && 'border-green-700'}`}
    >
      <Avatar className={`w-full h-full rounded-none border-[1px] border-white`}>
        <AvatarImage src={props.path} className="object-center object-fill" />
        <AvatarFallback className="bg-sky-500">
          <div className="w-full h-full bg-inherit"></div>
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export default function ProductDetails({ params }: {
  params: {
    productType: string;
    productId: string;
  }
}
) {
  const Gateway_Paypal = 'paypal';
  const Gateway_Stripe = 'stripe';
  const Gateway_Cancelled = 'cancelled';

  const searchParams = useSearchParams();
  const user = useCurrentUser();

  const [product, setProduct] = useState<Product>();
  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    let ignore = false; // # to prevent twice loading #
    if (params.productType && params.productId) {
      getProductById(params.productType, params.productId).then((response) => {
        if (!ignore && response) {
          setProduct(response);
          response?.previewList.map((path: string) => {
            getS3ImageLink(path).then(res => {
              if (res.success) {
                setImageList(prev => [...prev, res.response as string]);
              }
            })
          })
        }
      })
    }
    return () => {
      ignore = true;
    }
  }, [params]);

  const onItemSelected = (index: number) => {
    setSelectedIndex(index);
  }

  useEffect(() => {
    const gateway = searchParams.get('gateway');
    if (gateway === Gateway_Paypal) {
      const paymentId = String(searchParams.get("token"));
      const payerId = searchParams.get('PayerID');
      capturePaypalOrder({ paymentId });
      toast.success('New Product Purchased Newly through Paypal');
    } else if (gateway === Gateway_Stripe) {
      const paymentId = String(searchParams.get('session_id'));
      const payerId = 0;
      // captureStripeOrder({ paymentId });
      toast.success('New Product Purchased Newly through Stripe');
    } else if (gateway === Gateway_Cancelled) {
      toast.error('Payment Cancelled');
    }
    // window.history.replaceState(null, '', currentPath)
  }, [searchParams]);

  const setCartConfirming = (success: boolean, message?: string) => {
    setConfirming(true);
    if (success) {
      setConfirmingTitle("Success");
      setConfirmingMessage("1 product was moved to your cart successfully");
    } else {
      setConfirmingTitle("Failure");
      setConfirmingMessage(message || "An error occured while moving product to your cart");
    }
  }


  const onConfirmCart = () => {
    <ConfirmAlert open={isConfirming} title={confirmingTitle} message={confirmingMessage} onContinue={() => setConfirming(false)} />
    startTransition(() => {
      addProductToCart({
        userId: user?.id as string,
        product: {
          productType: product?.productType as string,
          productId: product?.productId as string
        }
      }).then(res => {
        if (res.success) {
          // Success
        } else {
          // Failure
        }
      }).catch(error => {
        // Failure
      });
    })
  }

  const onDownloadCreativeFiles = () => {
    fetch('/api/download').then(response => response.blob()).then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.click();
    })

    // axiosClient.post('/download', { fileList: product?.fileList }, axiosConfig).then(response => response.blob()).then(blob => {
    //   const link = document.createElement('a');
    //   link.href = URL.createObjectURL(blob);
    //   link.click();
    // })
  }

  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-5/6 flex flex-col gap-y-6">
        <Navbar title="Product Detail" content="You can see details of product" />
        <div className="w-full flex gap-x-8">
          <div className="w-3/4 flex flex-col gap-y-4">
            <Avatar className="w-full h-[480px] rounded-none">
              <AvatarImage src={imageList[selectedIndex]} className="object-cover" />
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
                <p>Price:</p><Bold>${product?.price}</Bold>
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
              <Button asChild variant="outline" className="border-green-700 gap-x-2">
                <Link href={`/profile/creator/${product?.ownerId}`}>
                  <FaRegUser className="text-green-700" />
                  Go to Creator's Profile
                </Link>
              </Button>
              <Alert title="Confirmation" message="Are you sure to move this product to your cart?" onContinue={onConfirmCart} onCancel={() => { }}>
                <Button variant="outline" className="w-full border-green-700 gap-x-2">
                  <FaCartArrowDown className="text-green-700" />
                  Add to cart
                </Button>
              </Alert>
              <PaymentButton mode="modal">
                <WrappedButton variant="default" className="w-full flex gap-x-2">
                  <AiFillCreditCard />Purchase
                </WrappedButton>
              </PaymentButton>
              <Button onClick={onDownloadCreativeFiles} variant="outline" className="w-full border-green-700 gap-x-2">
                <FaDownload className="text-green-700" />
                Download
              </Button>
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
  )
}