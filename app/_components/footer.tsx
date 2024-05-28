"use client";

import Image from "next/image";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/utils/gradient-button";
import { GradientParagraph } from "@/components/utils/gradient-paragraph";

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center gap-y-6">
      <div className="w-full px-14 py-6 rounded-[40px] flex justify-between bg-white/30">
        <div className="flex flex-col gap-y-6">
          <GradientParagraph className="text-lg font-semibold">
            Links
          </GradientParagraph>
          <div className="flex gap-x-12 text-sm text-[#3054B0] font-haas font-bold">
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
        <div className="flex flex-col gap-y-6">
          <GradientParagraph className="text-lg font-semibold">
            Trusted & Secure
          </GradientParagraph>
          <div className="flex gap-x-12">
            <div className="flex flex-col gap-y-3">
              <Image
                src="./footer/trustmark_x2F_engagement_x2F_certified.svg"
                width={121}
                height={51}
                alt="TrustedSite"
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <Image
                src="./footer/Norton Secure Seal 1.svg"
                width={96}
                height={46}
                alt="TrustPilot"
              />
              <Image
                src="./footer/trustpilot-logo.svg"
                width={96}
                height={46}
                alt="TrustPilot"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-6">
            <GradientParagraph className="text-lg font-semibold">
              Join Our Newsletter
            </GradientParagraph>
            <div className="flex items-center gap-x-6">
              <Image
                src="./footer/newsletter.svg"
                width={46}
                height={35}
                alt="newsletter"
              />
              <Input
                className="w-60 h-[35px] bg-[#E6CCE8] border-white rounded-[9px]"
                placeholder="Enter your email address"
              />
              <GradientButton
                className="font-firs text-[15px]"
                label="Subscribe"
                onClick={() => {}}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <GradientParagraph className="text-lg font-semibold">
              Social
            </GradientParagraph>
            <div className="flex items-center gap-x-16">
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
      </div>
      <div className="flex gap-x-4 font-haas text-sm">
        <p className="text-black">
          Copyright © 2024 KRE8TIVE, LLC. All rights reserved.
        </p>
        <div className="flex gap-x-4 text-[#3054B0]">
          <Link href="/">Terms of Use</Link>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};
