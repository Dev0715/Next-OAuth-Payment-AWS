"use client";

import React from "react";

import { CreatorSignUp } from "@/components/landing/creator-singup";
import { Finisher } from "@/components/landing/finisher";
import { LandingFooter } from "@/components/landing/landing-footer";
import { MemberSignUp } from "@/components/landing/member-signup";

const Home = () => {
  return (
    <div className="container px-[50px] py-10 landing-bg">
      <main className="space-y-6">
        <MemberSignUp />
        <CreatorSignUp />
        <Finisher />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Home;
