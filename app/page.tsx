"use client"

import React from 'react';
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from 'next/link';

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const Home = () => {
  const user = useCurrentUser();

  return (
    <main className="w-full">
      <div className="w-1/2 flex flex-col items-center gap-y-24 pt-32 text-center">
        <h1 className={cn("text-6xl font-semibold text-black drop-shadow-md", font.className)}>
          This site is scheduled to launch officially on May 15th
        </h1>
        <div className='space-y-4 text-center'>
          <p className="text-black text-lg">
            //** Fields to let them know creative features will be coming and to give them the ability to Opt In to those programs. **//
          </p>
          <p className="text-black text-lg">You can sign-up now as either a Seller or a User!</p>
        </div>
        <div className='flex gap-x-4'>
          <Button variant="default" asChild size="lg">
            <Link href="/auth/signup-creator">Sign-Up Now as a Creator</Link>
          </Button>
          <Button variant="default" asChild size="lg">
            <Link href="/auth/signup-user">Sign-Up Now as a User</Link>
          </Button>
          <Button variant="default" asChild size="lg">
            <Link href="/auth/signup-affiliate">Sign-Up Now as an Affiliate</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Home