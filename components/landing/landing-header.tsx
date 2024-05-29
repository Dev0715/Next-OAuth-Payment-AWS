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
    <nav className="container p-[50px] pb-0 flex flex-wrap items-center justify-between">
      <div className="w-full flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className={
              " text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            }
            href="/"
          >
            <Image
              src="/Kre8tiveBranding.svg"
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
          <div className="flex items-center gap-x-10">
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
    </nav>
  );
};
