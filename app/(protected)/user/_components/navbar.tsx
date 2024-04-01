"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { Separator } from "@/components/ui/separator";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full pb-6 flex flex-col gap-y-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl font-semibold text-black drop-shadow-md">
            ⚙️ Settings
          </h1>
          <p className="text-md text-gray-600">
            Manage your account settings set preferences.
          </p>
        </div>
        <UserButton />
      </div>
      <Separator className="h-[1px]" />
    </nav >
  );
};
