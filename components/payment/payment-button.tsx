"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PaymentForm } from "@/components/payment/payment-form";
import { useState } from "react";

interface PaymentButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  disabled: boolean;
}

export const PaymentButton = ({
  children,
  mode = "redirect",
  asChild,
  disabled,
}: PaymentButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/payment/pay");    // payment page
  };

  const [opened, setOpened] = useState(false);

  if (mode === "modal") {
    return (
      <Dialog open={opened} onOpenChange={open => setOpened(open)}>
        <DialogTrigger disabled={disabled} asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <PaymentForm onCancel={() => setOpened(false)} />
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
