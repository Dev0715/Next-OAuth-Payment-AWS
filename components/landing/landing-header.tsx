"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthButton } from "../auth/auth-button";

export const LandingHeader = () => {
  const history = useRouter();

  const onSignUp = () => {
    history.push("/auth/register");
  };

  const onLogin = () => {
    history.push("/auth/login");
  };

  return (
    <nav className="container p-4 md:p-8 lg:p-[50px] lg:pb-0">
      <div className="w-full flex flex-wrap items-center justify-center md:justify-between gap-4">
        <Link className="mr-1" href="/">
          <Image
            src="/Kre8tiveBranding.svg"
            width={366}
            height={53}
            alt="logo"
          />
        </Link>
        <div className="hidden xl:block text-center font-firs">
          <div className="max-w-[480px] m-auto text-[15px] text-black leading-[18px] font-semibold">
            KRE8TIVE is ushering in a vast library of specially-curated Premium
            digital assets for designers & developers.
          </div>
          <div className="max-w-[600px] mt-3.5 mx-auto text-[14px] text-[#3C58A0] leading-[15px] font-semibold">
            The Most Permissive Industry Use Licenses + Highly Flexible Pricing
            Model
            <br />+ A.I. Driven Search + Weekly/Monthly Deals to Save + Real
            Human Support 27/7/365
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-4 md:gap-x-10">
            <AuthButton
              comment="Become a member!"
              label="Signup"
              onClick={onSignUp}
            />
            <AuthButton
              comment="Existing members:"
              label="Login"
              onClick={onLogin}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 block xl:hidden text-center font-firs">
        <div className="m-auto text-[15px] text-black leading-[18px] font-semibold">
          KRE8TIVE is ushering in a vast library of specially-curated Premium
          digital assets for designers & developers.
        </div>
        <div className="mt-2 max-w-[650px] mx-auto text-[14px] text-[#3C58A0] leading-[15px] font-semibold">
          The Most Permissive Industry Use Licenses + Highly Flexible Pricing
          Model + A.I. Driven Search + Weekly/Monthly Deals to Save + Real Human
          Support 27/7/365
        </div>
      </div>
    </nav>
  );
};
