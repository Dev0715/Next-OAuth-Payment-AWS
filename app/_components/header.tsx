"use client";

import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";

import React from "react";
import { Navbar } from "./navbar";

export const Header = () => {
  return (
    <nav className="w-full">
      <div className="w-full flex items-end justify-between pb-4 sticky top-6 z-50 box-border border-b-[1px]">
        <div className="flex">
          {/* <Avatar className="w-16 h-16 rounded-xl">
            <AvatarImage src="/logo.svg" />
            <AvatarFallback className="bg-sky-500">
              <FaSignal className="text-white" />
            </AvatarFallback>
          </Avatar> */}

          <Link href="/">
            <p className="text-4xl font-semibold text-black drop-shadow-md">Kre8tive</p>
          </Link>
        </div>
        <UserButton />
      </div>
      <Navbar />
    </nav>
  );
};
