import { Button } from "@/components/ui/button"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { MdCancel } from 'react-icons/md';
import { AiFillCreditCard } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, } from "react-icons/fa";
import { useState, useTransition } from "react";
import { createOrder as createPaypalOrder } from "@/actions/payment/create-order";
import { usePathname } from "next/navigation";
import { createOrder as createStripeOrder } from "@/actions/stripe/create-order";

export const PaymentForm = () => {
	const Option_Paypal = 'option-paypal';
	const Option_Stripe = 'option-stripe';

	const [isPending, startTransition] = useTransition();
	const [paymentMethod, setPaymentMethod] = useState(Option_Paypal);

	const currentPath = usePathname();

	const onPurchase = async () => {
		startTransition(async () => {
			if (paymentMethod === Option_Paypal) {
				const createdResponse = await createPaypalOrder();
				console.log("RESULT", createdResponse);
				if (createdResponse.success) {
					console.log("LINK", createdResponse.result.links[1]);
					// window.location.href = createdResponse.result.links[1].href;
				}
				// const response = await fetch("/api/payment/paypal/capture_order", {
				// 	method: "POST",
				// 	headers: {
				// 		'Content-Type': 'application/json'
				// 	},
				// 	body: JSON.stringify({
				// 		order_id: res.orderID,
				// 	})
				// });
				// await captureOrder(res.orderID);
			} else {
				const response = await createStripeOrder({
					redirectUrl: currentPath
				});
				if (response.success) {
					window.location.href = response.payment?.url ?? '';
				}
			}
		})
	}

	return (
		<Card className="w-[480px]">
			<CardHeader>
				<CardTitle>Payment</CardTitle>
				<CardDescription>Select the payment method you prefer</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-y-6">
				<RadioGroup defaultValue={Option_Paypal} onValueChange={setPaymentMethod} className="w-full flex justify-between">
					<div className="flex items-center gap-x-4">
						<RadioGroupItem value={Option_Stripe} id={Option_Stripe} />
						<Label htmlFor={Option_Stripe} className="flex items-center gap-x-4 text-5xl">
							<FaCcVisa className="text-emerald-700" />
							<FaCcMastercard className="text-emerald-700" />
							<p className="text-lg">Stripe</p>
						</Label>
					</div>
					<div className="flex items-center gap-x-4">
						<RadioGroupItem value={Option_Paypal} id={Option_Paypal} />
						<Label htmlFor={Option_Paypal} className="flex items-center gap-x-4 text-5xl">
							<FaCcPaypal className="text-sky-700" />
							<p className="text-lg">Paypal</p>
						</Label>
					</div>
				</RadioGroup>
				<Table>
					{/* <TableCaption>Table Name</TableCaption> */}
					<TableHeader>
						<TableRow>
							<TableHead className="w-[150px]">Product ID</TableHead>
							<TableHead>Product Name</TableHead>
							<TableHead className="text-right">Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">Product 001</TableCell>
							<TableCell>Product 001</TableCell>
							<TableCell className="text-right">$100</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell className="text-right">$100</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</CardContent>
			<CardFooter className="flex flex-col">
				<div className="w-full flex justify-between">
					<Button variant="destructive" className="flex gap-x-2">
						<MdCancel /> Cancel	{/** Not Working Now */}
					</Button>
					<Button className="flex gap-x-2" disabled={isPending} onClick={onPurchase}>
						<AiFillCreditCard />Purchase
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}