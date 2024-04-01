"use client";

import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full pb-6 flex items-center">
      <div className="w-full flex">
        <div className="w-full flex items-end gap-4">
          <img src="./logo.svg" width="60" height="60" />
          <Link href="/">
            <p className="text-4xl font-semibold text-black drop-shadow-md">Kre8tive</p>
          </Link>
        </div>
      </div>
      <UserButton />
    </nav>
  );
};
