"use client";

import { Poppins } from "next/font/google";
import React from "react";

import { CreatorSignUp } from "@/components/landing/creator-singup";
import { Featured } from "@/components/landing/featured";
import { Finisher } from "@/components/landing/finisher";
import { Hero } from "@/components/landing/hero";

import { MemberSignUp } from "@/components/landing/member-signup";
import { cn } from "@/lib/utils";

import { Footer } from "./_components/footer";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const Home = () => {
  return (
    <>
      <main className={cn("w-full", font.className)}>
        <Hero />
        <section className="w-full flex flex-col gap-y-6">
          <MemberSignUp />
          <CreatorSignUp />
        </section>
        <Featured />
        <Finisher />
      </main>
      <Footer />
    </>
  );
};

export default Home;
