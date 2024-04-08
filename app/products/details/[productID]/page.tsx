"use client"

import { PaymentButton } from "@/components/payment/payment-button";
import { WrappedButton } from "@/components/utils/wrapped-button";
import { AiFillCreditCard } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaFacebook, FaProductHunt } from "react-icons/fa";
import { Navbar } from "../../_components/navbar";
import { usePathname, useSearchParams } from "next/navigation";
import { captureOrder as captureStripeOrder } from '@/actions/stripe/capture-order';
import { captureOrder as capturePaypalOrder } from "@/actions/paypal/capture-order";
import { toast } from "sonner";
import { useEffect } from "react";

interface PropsParams {
  params: {
    productId: string;
  }
}

function Bold({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-bold text-xl">
      {children}
    </span>
  )
}

export default function ProductDetails({ params }: PropsParams) {
  const Gateway_Paypal = 'paypal';
  const Gateway_Stripe = 'stripe';
  const Gateway_Cancelled = 'cancelled';

  const searchParams = useSearchParams();
  const currentPath = usePathname();

  return (
    <div className="w-full flex flex-col gap-y-12 py-6">
      <Navbar title="Product Detail" content="You can see details of product" />
      <div className="flex flex-col gap-y-6">
        <Avatar className="w-48 h-48 rounded-xl">
          <AvatarImage src="{imgPath}" />
          <AvatarFallback className="bg-sky-500">
            <FaProductHunt className="text-white" />
          </AvatarFallback>
        </Avatar>
        <p>Product detail page of <Bold>Product {params.productId}</Bold></p>
        <p>The Smartphone XYZ is a high-end mobile device that offers a range of advanced features and capabilities. It combines sleek design with powerful performance to provide users with a top-notch mobile experience.</p>
        <p>Key features include a large display, high-quality camera, long-lasting battery, and fast processor. The Smartphone XYZ is perfect for users who want a premium device that can handle all their daily tasks and activities.</p>
        <p>Whether you're browsing the web, streaming videos, or playing games, the Smartphone XYZ delivers smooth and responsive performance. It also offers a range of connectivity options, including Wi-Fi, Bluetooth, and 4G LTE, so you can stay connected wherever you go.</p>
        <p>Price: <Bold>$100</Bold></p>
      </div>
      <PaymentButton mode="modal">
        <WrappedButton variant="default" className="w-[480px] flex gap-x-2">
          <AiFillCreditCard />Purchase
        </WrappedButton>
      </PaymentButton>
    </div>
  )
}