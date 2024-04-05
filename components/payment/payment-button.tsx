"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PaymentForm } from "@/components/payment/payment-form";

interface PaymentButtonProps {
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
}

export const PaymentButton = ({
	children,
	mode = "redirect",
	asChild
}: PaymentButtonProps) => {
	const router = useRouter();

	const onClick = () => {
		router.push("/payment/pay");    // payment page
	};

	if (mode === "modal") {
		return (
			<Dialog>
				<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
				<DialogContent className="p-0 w-auto bg-transparent border-none">
					<PaymentForm />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<span onClick={onClick} className="cursor-pointer">
			{children}
		</span>
	);
};
