"use client";

import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";

import React from "react";
import { Navbar } from "./navbar";
import { usePathname } from "next/navigation";

export const Header = () => {
  const path = usePathname();

  const isAuthPage = () => {
    return path.indexOf("/auth") === 0;
  };

  return (
    <nav className="w-full z-10">
      <div className="w-full flex items-end justify-between pb-4 box-border border-b-[1px]">
        <div className="flex">
          <Link href="/">
            <p className="text-4xl font-semibold text-black drop-shadow-md">
              Kre8tive
            </p>
          </Link>
        </div>
        <UserButton />
      </div>
      {isAuthPage() ? null : <Navbar />}
    </nav>
  );
};
