"use client";

import React from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";
import { Featured } from "@/components/landing/featured";
import { Team } from "@/components/landing/team";
import { Finisher } from "@/components/landing/finisher";
import { Contact } from "@/components/landing/contact";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const Home = () => {
  return (
    <main className="relative w-full">
      <Hero />
      <Services />
      <Featured />
      <Team />
      <Finisher />
      <Contact />
      <div className="w-1/2 flex flex-col items-center gap-y-24 text-center">
        <h1
          className={cn(
            "text-7xl font-semibold text-green-700 drop-shadow-md",
            font.className
          )}
        >
          Bring your creative ideas to life!
        </h1>
        <div className="w-full space-y-4 text-left text-black text-lg">
          <p>
            /** This site is scheduled to launch officially on May 15th! - [
            Need to be updated ]
          </p>
          <p>
            You can bring creative features coming and Opt In to those programs.
            - [ Need to be updated ]
          </p>
          <p>
            You can pre-register as a customer and will get big benefits by
            being a early subscriber! **/
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-2xl font-bold">
            You can sign-up now as either a Seller or a User!
          </p>
          <Button
            className="w-1/2 animate-pulse"
            variant="default"
            asChild
            size="lg"
          >
            <Link href="/auth/register">Sign-Up Now</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
