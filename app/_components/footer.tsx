"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

export const Footer = () => {
  return (
    <div className="w-full h-12 flex items-center justify-center bg-gray-200 z-10 relative">
      <div className="w-5/6 flex justify-between">
        <p>
          Copyright © 2024 Kre8tive, Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-x-6 text-sm underline underline-offset-4">
          <Link href="/privacy-policy">
            <p>Privacy Policy</p>
          </Link>
          <Link href="/terms-of-service">
            <p>Terms of Service</p>
          </Link>
          <Link href="/cookie-policy">
            <p>Cookie Policy</p>
          </Link>
        </div>
      </div>
    </div>
  )
}