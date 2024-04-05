"use client"

import { PaymentButton } from "@/components/payment/payment-button";
import { Button } from "@/components/ui/button";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { AiFillCreditCard } from "react-icons/ai";

interface PropsParams {
	params: {
		productID: string;
	}
}

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function Bold({ children }: { children: React.ReactNode }) {
	return (
		<span className="font-bold text-xl">
			{children}
		</span>
	)
}

export default function ProductDetails({ params }: PropsParams) {
	return (
		<div className="w-full flex flex-col gap-y-12 pt-6">
			<section className="flex flex-col gap-y-6">
				<p>Product detail page of <Bold>Product {params.productID}</Bold></p>
				<p>Something... Something ...</p>
				<p>Something... Something ...</p>
				<p>Something... Something ...</p>
				<p>Price: <Bold>$100</Bold></p>
			</section>
			{/* <PaymentButton> */}
			<button className="w-[480px] flex gap-x-2">
				<AiFillCreditCard />Purchase
			</button>
			{/* </PaymentButton> */}
		</div>
	)
}


// <form action="/api/payment/stripe/checkout_sessions" method="POST">
// 	<section className="w-[400px] h-[112px]">
// 		<Button type="submit" role="link">
// 			Checkout with Stripe
// 		</Button>
// 	</section>
// </form>