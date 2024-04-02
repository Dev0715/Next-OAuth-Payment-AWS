"use client";

import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaSignal } from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className="w-full pb-6 flex items-end bg-gray-50 sticky top-6 box-border z-50">
      <div className="w-full flex">
        <div className="w-full flex items-end gap-4">
          <Avatar className="w-16 h-16 rounded-xl">
            <AvatarImage src="@/public/logo.svg" />
            <AvatarFallback className="bg-sky-500">
              <FaSignal className="text-white" />
            </AvatarFallback>
          </Avatar>
          <Link href="/">
            <p className="text-4xl font-semibold text-black drop-shadow-md">Kre8tive</p>
          </Link>
        </div>
      </div>
      <UserButton />
    </nav>
  );
};
