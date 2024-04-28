"use client";

import { Separator } from "@/components/ui/separator";
import { Header } from "../_components/header";
import { PasswordChangeForm } from "@/components/auth/password-change-form";
import { CryptoPrefForm } from "@/components/profile/cryptopref-form";
import { PaymentPrefForm } from "@/components/profile/paymentpref-form";
import { DonatePrefForm } from "@/components/profile/donatepref-form";

const Account = () => {
  return (
    <main className="w-full pl-8 pb-6 flex flex-col gap-y-5">
      <Header title="Account" content="Your account information here" />
      <Separator />
      <div className="w-full flex gap-x-12">
        <div className="w-1/2 flex flex-col gap-y-12">
          <PasswordChangeForm />
          <DonatePrefForm />
        </div>
        <div className="w-1/2 flex flex-col gap-y-12">
          <PaymentPrefForm />
          <CryptoPrefForm />
        </div>
      </div>

    </main>
  )
};

export default Account;
