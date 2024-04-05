"use client"

import { PaymentButton } from "@/components/payment/payment-button";
import { WrappedButton } from "@/components/wrapped-button";
import { loadStripe } from "@stripe/stripe-js";
import { AiFillCreditCard } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaFacebook } from "react-icons/fa";
import { Navbar } from "../../_components/navbar";

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
			<Navbar title="Product Detail" content="You can see details of product" />
			<section className="flex flex-col gap-y-6">
				<Avatar className="w-48 h-48 rounded-xl">
					<AvatarImage src="{imgPath}" />
					<AvatarFallback className="bg-sky-500">
						<FaFacebook className="text-white" />
					</AvatarFallback>
				</Avatar>
				<p>Product detail page of <Bold>Product {params.productID}</Bold></p>
				<p>The Smartphone XYZ is a high-end mobile device that offers a range of advanced features and capabilities. It combines sleek design with powerful performance to provide users with a top-notch mobile experience.</p>
				<p>Key features include a large display, high-quality camera, long-lasting battery, and fast processor. The Smartphone XYZ is perfect for users who want a premium device that can handle all their daily tasks and activities.</p>
				<p>Whether you're browsing the web, streaming videos, or playing games, the Smartphone XYZ delivers smooth and responsive performance. It also offers a range of connectivity options, including Wi-Fi, Bluetooth, and 4G LTE, so you can stay connected wherever you go.</p>
				<p>Price: <Bold>$100</Bold></p>
			</section>
			<PaymentButton mode="modal">
				<WrappedButton variant="default" className="w-[480px] flex gap-x-2">
					<AiFillCreditCard />Purchase
				</WrappedButton>
			</PaymentButton>
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