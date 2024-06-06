"use client";

import Link from "next/link";

import { GradientButton } from "@/components/utils/gradient-button";

export const RegisterCompleteForm = () => {
  return (
    <div className="w-[480px] m-auto space-y-6 text-center">
      <p className="text-base text-gray-500">
        You have completed onboarding steps.
      </p>
      <GradientButton
        asChild
        className="w-64 inline-flex gap-x-4 border-red-700"
      >
        <Link href="/">Browse Assets</Link>
      </GradientButton>
    </div>
  );
};
