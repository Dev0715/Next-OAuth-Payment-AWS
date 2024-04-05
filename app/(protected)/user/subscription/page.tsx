"use client";

import { Separator } from "@/components/ui/separator";
import { Header } from "../_components/header";
import { PaymentForm } from "@/components/payment/payment-form";

const Settings = () => {
  return (
    <main className="w-full h-full pl-8 flex flex-col gap-y-5">
      <Header title="Subscription" content="Select your plan for a membership" />
      <Separator />
      <PaymentForm />
    </main>
  )
};

export default Settings;
