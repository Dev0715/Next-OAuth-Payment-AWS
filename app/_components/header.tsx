"use client";

import Image from "next/image";
import Link from "next/link";

import { UserButton } from "@/components/auth/user-button";

export const Header = () => {
  return (
    <nav
      className={
        " w-full flex flex-wrap items-center justify-between px-2 py-3 "
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className={
              " text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            }
            href="/"
          >
            <Image
              src="/Kre8tive Branding.svg"
              width={366}
              height={53}
              alt="logo"
            />
          </Link>
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
