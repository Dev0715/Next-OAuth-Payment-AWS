"use client"

import React from 'react';
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignupButton } from "@/components/auth/signup-button";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from 'next/link';

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const Home = () => {
  const user = useCurrentUser();

  return (
    <main className="flex h-full flex-col p-10">
      <div className="w-full h-full flex justify-center pt-32">
        <div className="space-y-24 text-center">
          <h1
            className={cn(
              "text-5xl font-semibold text-black drop-shadow-md",
              font.className
            )}
          >
            This site is scheduled to launch officially on May 15th
          </h1>
          <div>
            <p className="text-black text-lg">
              Fields to let them know these features will be coming and to give them the ability to Opt In to those programs
            </p>
          </div>
          <div className="space-y-6 text-center">
            <p className="text-black text-lg">You can sign-up now as either a Seller, Affiliate or a User.</p>
            <div>
              {user ?
                <Button variant="default" size="lg">
                  <Link href="/user">Go to your profile</Link>
                </Button> :
                <SignupButton>
                  <Button variant="default" size="lg">
                    Sign-Up Now
                  </Button>
                </SignupButton>
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home