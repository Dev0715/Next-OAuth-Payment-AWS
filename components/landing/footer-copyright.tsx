import Link from "next/link";

export const FooterCopyright = () => (
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
);
