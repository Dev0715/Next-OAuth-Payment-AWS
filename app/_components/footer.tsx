"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col">
      <div className="w-full px-14 py-6 rounded-[40px] flex bg-white/30">
        <div className="flex flex-col gap-y-6">
          <p className="text-lg font-semibold text-[]">Links</p>
          <div className="flex gap-x-12 text-sm text-[#3054B0] font-bold">
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
      </div>
    </footer>
  );
};
