"use client";

import Link from "next/link";
import { FaKey } from "react-icons/fa";

import { GradientButton } from "@/components/utils/gradient-button";

type Props = {
  step: number;
};

export const RegisterCompleteForm = ({ step }: Props) => {
  return (
    <div className="w-[480px] m-auto space-y-6">
      <p className="text-xl text-green-700">{step + 1}. Complete Onboarding</p>
      <div className="flex flex-col">
        <p>Congratulations!</p>
        <p className="text-base text-gray-500">
          You have completed onboarding steps.
        </p>
      </div>
      <div className="w-full mt-4">
        <GradientButton asChild className="w-64 flex gap-x-4 border-red-700">
          <Link href="/">
            <FaKey />
            Browse Products
          </Link>
        </GradientButton>
      </div>
    </div>
  );
};
