"use client";

import React from "react";

import { CreatorSignUp } from "@/components/landing/creator-singup";
import { Featured } from "@/components/landing/featured";
import { Finisher } from "@/components/landing/finisher";
import { LandingFooter } from "@/components/landing/landing-footer";
import { MemberSignUp } from "@/components/landing/member-signup";

const Home = () => {
  return (
    <div className="container landing-bg">
      <main>
        <section className="w-full flex flex-col gap-y-6">
          <MemberSignUp />
          <CreatorSignUp />
        </section>
        <Featured />
        <Finisher />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Home;
