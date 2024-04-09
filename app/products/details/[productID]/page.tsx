"use client"

import { PaymentButton } from "@/components/payment/payment-button";
import { WrappedButton } from "@/components/utils/wrapped-button";
import { AiFillCreditCard } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCartArrowDown, FaFacebook, FaProductHunt, FaRegUser } from "react-icons/fa";
import { Navbar } from "../../_components/navbar";
import { usePathname, useSearchParams } from "next/navigation";
import { captureOrder as captureStripeOrder } from '@/actions/stripe/capture-order';
import { captureOrder as capturePaypalOrder } from "@/actions/paypal/capture-order";
import { toast } from "sonner";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

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

  const tempImagePath = "/profile-back-example.jpg";

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

  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-5/6 flex flex-col gap-y-6">
        <Navbar title="Product Detail" content="You can see details of product" />
        <div className="w-full flex gap-x-8">
          <div className="w-3/4 flex flex-col gap-y-4">
            <Avatar className="w-full h-[480px] rounded-none">
              <AvatarImage src={tempImagePath} className="object-cover" />
              <AvatarFallback className="bg-sky-500">
                <div className="w-full h-full bg-inherit"></div>
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-x-4">
              {[...Array(7)].map(item => (
                <Avatar className="w-28 h-16 rounded-none border-[2px] hover:border-green-700">
                  <AvatarImage src={tempImagePath} className="object-center object-fill" />
                  <AvatarFallback className="bg-sky-500">
                    <div className="w-full h-full bg-inherit"></div>
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          <div className="w-1/4 flex flex-col gap-y-12">
            <div className="w-full flex flex-col gap-y-4">
              <div className="w-full flex justify-between">
                <p>Price:</p><Bold>$100</Bold>
              </div>
              <div className="w-full flex justify-between">
                <p>Categories:</p>
                <p className="text-lg font-medium">Graphics / Objects</p>
              </div>
              <div className="w-full flex justify-between">
                <p>Reviews:</p>
                <p className="text-xl text-rose-700">★ ★ ★ ★ ★</p>
              </div>
              <div className="w-full flex justify-between">
                <p>/** Some More: **/</p>
                <p>/** ... **/</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <Button variant="outline" className="border-green-700 gap-x-2">
                <FaRegUser className="text-green-700" />
                Go to Creator's Profile
              </Button>
              <Button variant="outline" className="border-green-700 gap-x-2">
                <FaCartArrowDown className="text-green-700" />
                Add to cart
              </Button>
              <PaymentButton mode="modal">
                <WrappedButton variant="default" className="w-full flex gap-x-2">
                  <AiFillCreditCard />Purchase
                </WrappedButton>
              </PaymentButton>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col pt-2">
          <p className="text-2xl font-bold mb-4">About the Product</p>
          <p>Fresh update! Flower Boom Posters included in the Bundle!</p>
          <p>The Smartphone XYZ is a high-end mobile device that offers a range of advanced features and capabilities. It combines sleek design with powerful performance to provide users with a top-notch mobile experience.</p>
          <p>Key features include a large display, high-quality camera, long-lasting battery, and fast processor. The Smartphone XYZ is perfect for users who want a premium device that can handle all their daily tasks and activities.</p>
          <p>Whether you're browsing the web, streaming videos, or playing games, the Smartphone XYZ delivers smooth and responsive performance. It also offers a range of connectivity options, including Wi-Fi, Bluetooth, and 4G LTE, so you can stay connected wherever you go.</p>
        </div>
      </div>
    </div>
  )
}