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

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function Bold({ children }: { children: React.ReactNode }) {
	return (
		<span className="font-bold text-xl">
			{children}
		</span>
	)
}

export default function ProductDetails({ params }: PropsParams) {
	const searchParmas = useSearchParams();

	const paypalCreateOrder = async () => {
		try {
			const response = await axiosClient.post("/payment/paypal/create_order", {
				user_id: "1234", // sotre.getState().auth.user._id
				order_price: 100, // amountRef.current.value
			}, axiosConfig);

			return { orderid: '' }; // response.data.orderID
		} catch (err) {
			return null;
		}
	}

	const paypalCaptureOrder = async (order_id: string) => {
		try {
			const response = await fetch("/api/payment/paypal/capture_order", {
				method: "POST",
				body: JSON.stringify({
					order_id,
				})
			});

			if (response) { // response.data.success
				// Order is successful
				// Custom code
				// response.data.data.wallet.balance
			}

		} catch (err) {
			// err
		}
	}

	if (searchParmas.get('success')) {
		console.log('Order placed! You will receive an email confirmation.');
	}
	if (searchParmas.get('canceled')) {
		console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
	}

	return (
		<main className="w-full flex flex-col gap-y-12 pt-6">
			<section className="flex flex-col gap-y-6">
				<p>Product detail page of <Bold>Product {params.productID}</Bold></p>
				<p>Something... Something ...</p>
				<p>Something... Something ...</p>
				<p>Something... Something ...</p>
				<p>Price: <Bold>$100</Bold></p>
			</section>
			<PaymentButton>
				<Button variant="default" className="w-[480px] flex gap-x-2">
					<AiFillCreditCard />Purchase
				</Button>
			</PaymentButton>
		</main>
	)
}


// <form action="/api/payment/stripe/checkout_sessions" method="POST">
// 	<section className="w-[400px] h-[112px]">
// 		<Button type="submit" role="link">
// 			Checkout with Stripe
// 		</Button>
// 	</section>
// </form>