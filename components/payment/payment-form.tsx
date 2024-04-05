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
import { createOrder } from "@/actions/payment/create-order";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { captureOrder } from "@/actions/payment/capture-order";
import { useRouter } from "next/navigation";

export const PaymentForm = () => {
	const optionPaypal = 'option-paypal';
	const optionStripe = 'option-stripe';

	const [isPending, startTransition] = useTransition();
	const [paymentMethod, setPaymentMethod] = useState(optionPaypal);


	const onPurchase = async () => {
		console.log("__PAYMENT__METHOD__", paymentMethod);

		startTransition(async () => {
			const createdResponse = await createOrder();
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
		})
	}

	return (
		<Card className="w-[480px]">
			<CardHeader>
				<CardTitle>Payment</CardTitle>
				<CardDescription>Select the payment method you prefer</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-y-6">
				<RadioGroup defaultValue={optionPaypal} onValueChange={setPaymentMethod} className="w-full flex justify-between">
					<div className="flex items-center gap-x-4">
						<RadioGroupItem value={optionStripe} id={optionStripe} />
						<Label htmlFor={optionStripe} className="flex items-center gap-x-4 text-5xl">
							<FaCcVisa className="text-emerald-700" />
							<FaCcMastercard className="text-emerald-700" />
							<p className="text-lg">Stripe</p>
						</Label>
					</div>
					<div className="flex items-center gap-x-4">
						<RadioGroupItem value={optionPaypal} id={optionPaypal} />
						<Label htmlFor={optionPaypal} className="flex items-center gap-x-4 text-5xl">
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
					<Button className="flex gap-x-2" onClick={onPurchase}>
						<AiFillCreditCard />Purchase
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}