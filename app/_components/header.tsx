"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { UserButton } from "@/components/auth/user-button";
import { LandingHeader } from "@/components/landing/landing-header";
import { GradientParagraph } from "@/components/utils/gradient-paragraph";

export const Header = () => {
  const path = usePathname();

  const isLandingPage = useMemo(() => {
    return path === "/";
  }, [path]);

  if (isLandingPage) {
    return <LandingHeader />;
  }

  return (
    <nav className="relative bg-white shadow-lg w-full flex flex-wrap items-center justify-between px-2 py-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link href="/">
            <GradientParagraph className="text-gray-800 text-2xl font-bold font-firs leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">
              Kre8tive
            </GradientParagraph>
          </Link>
        </div>
        <div className="text-gray-800">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
