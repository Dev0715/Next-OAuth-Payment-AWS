"use client"

import { Button } from "@/components/ui/button";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

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


	return (
		<main className="w-full flex flex-col gap-y-6 pt-6">
			<p>Product detail page of <Bold>Product {params.productID}</Bold></p>
			<p>Something... Something ...</p>
			<p>Something... Something ...</p>
			<p>Something... Something ...</p>
			<p>Price: <Bold>$100</Bold></p>
		</main>
	)
}