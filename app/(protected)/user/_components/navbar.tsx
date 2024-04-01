"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { Separator } from "@/components/ui/separator";

export const Navbar = () => {
  return (
    <nav className="w-full pb-6 flex flex-col gap-y-6">
      <div className="flex justify-between items-center w-full">
        <header className="flex flex-col gap-y-2">
          <p className="text-3xl text-black font-medium drop-shadow-md">User Settings</p>
          <p className="text-md text-gray-600">
            Manage your account settings set preferences.
          </p>
        </header>
        <UserButton />
      </div>
      <Separator className="h-[1px]" />
    </nav >
  );
};
