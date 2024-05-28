"use client";

import Image from "next/image";
import Link from "next/link";

import { UserButton } from "@/components/auth/user-button";

export const Header = () => {
  return (
    <nav className="w-full pb-10 flex flex-wrap items-center justify-between">
      <div className="w-full flex flex-wrap items-center justify-between">
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
        <div className="flex flex-col gap-y-3 font-firs">
          <div className="flex flex-col items-center text-[15px] leading-tight font-semibold">
            <p>KRE8TIVE is ushering in a vast library of specially-curated</p>
            <p>premium digital assets for designers & developers.</p>
          </div>
          <div className="flex flex-col items-center text-[14px] text-[#3C58A0] leading-tight font-semibold">
            <p>
              The Most Permissive Industry Use Licenses + Highly Flexible
              Pricing Model
            </p>
            <p>
              + A.I. Driven Search + Weekly/Monthly Deals to Save + Real Human
              Support 27/7/365
            </p>
          </div>
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
