"use client";

import Link from "next/link";
import { FaKey } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export const RegisterCompleteForm = () => {
  return (
    <div className="w-[480px] m-auto space-y-6">
      <p className="text-xl text-green-700">Complete Onboarding</p>
      <div className="flex flex-col">
        <p>Congratulations!</p>
        <p className="text-base text-gray-500">
          You have completed onboarding steps.
        </p>
      </div>
      <div className="w-full mt-4">
        <Button asChild className="w-64 flex gap-x-4 border-red-700">
          <Link href="/">
            <FaKey />
            Browse Products
          </Link>
        </Button>
      </div>
    </div>
  );
};
