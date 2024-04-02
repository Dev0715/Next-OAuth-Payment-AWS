"use client";

import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className="w-full pb-6 flex items-center">
      <div className="w-full flex">
        <div className="w-full flex items-end gap-4">
          <Avatar className="w-16 h-16 rounded-xl">
            <AvatarImage src="./logo.svg" />
            <AvatarFallback className="bg-sky-500">
              {/* <FaUser className="text-white" /> */}
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
