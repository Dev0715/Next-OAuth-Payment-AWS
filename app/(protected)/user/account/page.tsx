"use client";

import { Separator } from "@/components/ui/separator";
import { Header } from "../_components/header";

const Account = () => {
  return (
    <main className="w-full pl-8 flex flex-col gap-y-5">
      <Header title="Account" content="Your account information here" />
      <Separator />
    </main>
  )
};

export default Account;
