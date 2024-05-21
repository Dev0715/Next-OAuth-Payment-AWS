"use client";

import { Poppins } from "next/font/google";
import React from "react";

import { Featured } from "@/components/landing/featured";
import { Finisher } from "@/components/landing/finisher";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";

import { cn } from "@/lib/utils";

import { Footer } from "./_components/footer";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const Home = () => {
  return (
    <>
      <main className={cn("relative w-full", font.className)}>
        <Hero />
        <Services />
        <Featured />
        <Finisher />
      </main>
      <Footer />
    </>
  );
};

export default Home;
