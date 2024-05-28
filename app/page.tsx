"use client";

import React from "react";

import { CreatorSignUp } from "@/components/landing/creator-singup";
import { Featured } from "@/components/landing/featured";
import { Finisher } from "@/components/landing/finisher";
import { Hero } from "@/components/landing/hero";
import { MemberSignUp } from "@/components/landing/member-signup";

import { Footer } from "./_components/footer";

const Home = () => {
  return (
    <div className="w-full landing-bg">
      <main>
        <Hero />
        <section className="w-full flex flex-col gap-y-6">
          <MemberSignUp />
          <CreatorSignUp />
        </section>
        <Featured />
        <Finisher />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
