"use client";

import { Separator } from "@/components/ui/separator";
import { Header } from "../_components/header";
import { PasswordChangeForm } from "@/components/auth/password-change-form";
import { CryptoPrefForm } from "@/components/profile/cryptopref-form";

const Account = () => {
  return (
    <main className="w-full pl-8 pb-6 flex flex-col gap-y-5">
      <Header title="Account" content="Your account information here" />
      <Separator />
      <div className="w-full flex gap-x-4">
        <PasswordChangeForm />
        <CryptoPrefForm />
      </div>

    </main>
  )
};

export default Account;
