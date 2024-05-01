"use client";

import React from "react";
import { Poppins } from "next/font/google";

import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";
import { Featured } from "@/components/landing/featured";
import { Finisher } from "@/components/landing/finisher";
import { Footer } from "./_components/footer";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const Home = () => {
  return (
    <>
      <main className="relative w-full">
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
