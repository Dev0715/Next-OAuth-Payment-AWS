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
    <main className="w-full flex justify-center pt-24">
      <div className="w-1/2 flex flex-col items-center gap-y-24 text-center">
        <h1 className={cn("text-7xl font-semibold text-black drop-shadow-md", font.className)}>
          Bring your creative ideas to life!

        </h1>
        <div className='w-full space-y-4 text-left text-black text-lg'>
          <p>/** This site is scheduled to launch officially on May 15th! - [ Need to be updated ]</p>
          <p>You can bring creative features coming and Opt In to those programs. - [ Need to be updated ]</p>
          <p>You can pre-register as a customer and will get big benefits by being a early subscriber! **/</p>
        </div>
        <div className='flex flex-col items-center gap-y-4'>
          <p className='text-2xl font-bold'>You can sign-up now as either a Seller or a User!</p>
          <Button className='w-1/2' variant="default" asChild size="lg">
            <Link href="/auth/register">Sign-Up Now</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Home