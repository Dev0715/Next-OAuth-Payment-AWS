"use client";

import { TransitionInOut } from "@/components/utils/transition-in-out";

const OnboardingPage = () => {
  return (
    <div className="w-[640px]">
      <TransitionInOut condition>Hello</TransitionInOut>
    </div>
  );
};

export default OnboardingPage;
