import Link from "next/link";

import { GradientParagraph } from "../utils/gradient-paragraph";

export const FooterLinks = () => (
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
);
