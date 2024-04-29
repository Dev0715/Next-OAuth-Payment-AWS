"use client";

import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";

import React, { useState } from "react";
import { Navbar } from "./navbar";
import { usePathname } from "next/navigation";

type HeaderProps = { transparent?: boolean };

export const Header = ({ transparent = true }: HeaderProps) => {
  const path = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const isAuthPage = () => {
    return path.indexOf("/auth") === 0;
  };

  return (
    <nav
      className={
        (transparent
          ? "top-0 absolute z-50 w-full"
          : "relative bg-white shadow-lg") +
        " flex flex-wrap items-center justify-between px-2 py-3 "
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className={
              (transparent ? "text-white" : "text-gray-800") +
              " text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            }
            href="/"
          >
            Kre8tive
          </Link>
        </div>
        <UserButton />
      </div>
    </nav>
  );
};
