"use client";

import Image from "next/image";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/utils/gradient-button";
import { GradientParagraph } from "@/components/utils/gradient-paragraph";

export const LandingFooter = () => {
  return (
    <footer className="w-full flex flex-col items-center gap-y-6">
      <div className="w-full p-8 lg:px-14 lg:pt-[27px] lg:pb-10 rounded-3xl lg:rounded-[40px] grid md:grid-cols-2 xl:grid-cols-[2fr_2fr_3fr] gap-4 bg-white/30">
        <div className="row-span-2">
          <GradientParagraph className="text-lg font-semibold">
            Links
          </GradientParagraph>
          <div className="mt-2 lg:mt-6 flex gap-x-12 text-sm text-[#3054B0] font-haas font-bold">
            <div className="flex flex-col gap-y-3">
              <Link href="/">Sign up for Membership</Link>
              <Link href="/">Login</Link>
              <Link href="/">Affiliate Program</Link>
              <Link href="/">Licensing</Link>
              <Link href="/">Contact Us</Link>
            </div>
            <div className="flex flex-col gap-y-3">
              <Link href="/">About Us</Link>
              <Link href="/">Products</Link>
              <Link href="/">Latest News</Link>
              <Link href="/">Careers</Link>
              <Link href="/">For Creators</Link>
            </div>
          </div>
        </div>
        <div className="row-span-2">
          <GradientParagraph className="text-lg font-semibold">
            Trusted & Secure
          </GradientParagraph>
          <div className="mt-4 lg:mt-6 flex gap-x-12">
            <div className="flex flex-col items-center gap-y-9">
              <Image
                src="./footer/TrustmarkEngagement.svg"
                width={121}
                height={51}
                alt="TrustedSite"
              />
            </div>
            <div className="flex flex-col items-center gap-y-9">
              <Image
                src="./footer/NortonSecureSeal.svg"
                width={114}
                height={63}
                alt="TrustPilot"
              />
              <Image
                src="./footer/TrustpilotLogo.svg"
                width={96}
                height={46}
                alt="TrustPilot"
              />
            </div>
          </div>
        </div>
        <div className="">
          <GradientParagraph className="text-lg font-semibold">
            Join Our Newsletter
          </GradientParagraph>
          <div className="mt-4 lg:mt-6 flex items-center flex-wrap gap-x-2 lg:gap-x-6">
            <Image
              className="hidden lg:block"
              src="./footer/NewsLetter.svg"
              width={46}
              height={35}
              alt="newsletter"
            />
            <Input
              className="w-32 md:w-48 xl:w-60 h-[35px] bg-[#E6CCE8] border-white rounded-[9px]"
              placeholder="Enter your email address"
            />
            <GradientButton
              className="font-firs text-[15px] leading-none py-2"
              label="Subscribe"
              onClick={() => {}}
            />
          </div>
        </div>
        <div>
          <GradientParagraph className="text-lg font-semibold">
            Social
          </GradientParagraph>
          <div className="mt-4 lg:mt-6 flex items-center gap-4 md:justify-between">
            <Link href="/">
              <Image
                src="./social/linkedin.svg"
                width={26}
                height={26}
                alt="linkedin"
              />
            </Link>
            <Link href="/">
              <Image
                src="./social/x.svg"
                width={27}
                height={27}
                alt="linkedin"
              />
            </Link>
            <Link href="/">
              <Image
                src="./social/facebook.svg"
                width={26}
                height={26}
                alt="linkedin"
              />
            </Link>
            <Link href="/">
              <Image
                src="./social/youtube.svg"
                width={29}
                height={20}
                alt="linkedin"
              />
            </Link>
            <Link href="/">
              <Image
                src="./social/instagram.svg"
                width={25}
                height={25}
                alt="linkedin"
              />
            </Link>
            <Link href="/">
              <Image
                src="./social/pinterest.svg"
                width={24}
                height={24}
                alt="linkedin"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="md:flex md:gap-x-4 font-haas text-sm text-center">
        <p className="text-black">
          Copyright © 2024 KRE8TIVE, LLC. All rights reserved.
        </p>
        <div className="mt-4 sm:mt-0 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#3054B0]">
          <Link href="/">Terms of Use</Link>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};
