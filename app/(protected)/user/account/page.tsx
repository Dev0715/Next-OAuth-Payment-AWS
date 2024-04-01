"use client";

import { Separator } from "@/components/ui/separator";

const Account = () => {
  return (
    <main className="w-full h-full pl-8 flex flex-col gap-y-5">
      <header className="flex flex-col gap-y-1">
        <p className="text-xl text-black font-medium drop-shadow-md">Account</p>
        <p className="text-sm text-gray-600">
          Your account information here
        </p>
      </header>
      <Separator />
    </main>
  )
};

export default Account;
